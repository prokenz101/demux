//* Boilerplate MediaInfo bindings

use std::ffi::c_void;
use std::os::windows::ffi::OsStrExt;
use std::path::Path;

#[repr(usize)]
#[derive(Copy, Clone, Debug)]
pub enum StreamKind {
    General = 0,
    Video = 1,
    Audio = 2,
    Text = 3,   // Subtitles
    Other = 4,
    Image = 5,
    Menu = 6,
}

#[repr(usize)]
#[derive(Copy, Clone, Debug)]
pub enum InfoKind {
    Name = 0,
    Text = 1,
    Measure = 2,
    Options = 3,
    NameText = 4,
    MeasureText = 5,
    Info = 6,
    HowTo = 7,
}

extern "C" {
    fn MediaInfo_New() -> *mut c_void;
    fn MediaInfo_Delete(handle: *mut c_void);
    fn MediaInfo_Open(handle: *mut c_void, file: *const u16) -> usize;
    fn MediaInfo_Close(handle: *mut c_void);
    fn MediaInfo_Option(handle: *mut c_void, option: *const u16, value: *const u16) -> *const u16;
    fn MediaInfo_Inform(handle: *mut c_void, reserved: usize) -> *const u16;
    fn MediaInfo_Get(
        handle: *mut c_void,
        stream_kind: usize,
        stream_number: usize,
        parameter: *const u16,
        kind_of_info: usize,
        kind_of_search: usize,
    ) -> *const u16;
    fn MediaInfo_Count_Get(handle: *mut c_void, stream_kind: usize, stream_number: usize) -> usize;
}

fn to_wide(s: &str) -> Vec<u16> {
    std::ffi::OsStr::new(s).encode_wide().chain(std::iter::once(0)).collect()
}

unsafe fn from_wide_ptr(ptr: *const u16) -> String {
    if ptr.is_null() {
        return String::new();
    }
    let mut len = 0;
    while *ptr.add(len) != 0 {
        len += 1;
    }
    String::from_utf16_lossy(std::slice::from_raw_parts(ptr, len))
}

pub struct MediaInfo {
    handle: *mut c_void,
}

impl MediaInfo {
    pub fn new() -> Self {
        let handle = unsafe { MediaInfo_New() };
        assert!(!handle.is_null(), "Failed to allocate MediaInfo handle");
        Self { handle }
    }

    pub fn set_option(&self, option: &str, value: &str) -> String {
        let opt = to_wide(option);
        let val = to_wide(value);
        unsafe { from_wide_ptr(MediaInfo_Option(self.handle, opt.as_ptr(), val.as_ptr())) }
    }

    pub fn open<P: AsRef<Path>>(&self, path: P) -> Result<(), String> {
        let wide_path: Vec<u16> = path.as_ref().as_os_str().encode_wide().chain(std::iter::once(0)).collect();
        let opened = unsafe { MediaInfo_Open(self.handle, wide_path.as_ptr()) };
        if opened == 0 {
            Err("Failed to open file or unrecognized container format".into())
        } else {
            Ok(())
        }
    }

    /// Query the number of streams of a specific kind (e.g., number of audio tracks)
    pub fn count_streams(&self, kind: StreamKind) -> usize {
        unsafe { MediaInfo_Count_Get(self.handle, kind as usize, usize::MAX) }
    }

    /// Query a specific parameter by name for a stream
    pub fn get(&self, kind: StreamKind, stream_index: usize, parameter: &str) -> String {
        let param = to_wide(parameter);
        unsafe {
            let res = MediaInfo_Get(
                self.handle,
                kind as usize,
                stream_index,
                param.as_ptr(),
                InfoKind::Text as usize,
                InfoKind::Name as usize,
            );
            from_wide_ptr(res)
        }
    }

    /// Export the formatted text/JSON output of the file
    pub fn inform(&self) -> String {
        unsafe { from_wide_ptr(MediaInfo_Inform(self.handle, 0)) }
    }

    /// Explicitly close current file without dropping the engine
    pub fn close(&self) {
        unsafe { MediaInfo_Close(self.handle) };
    }
}

impl Drop for MediaInfo {
    fn drop(&mut self) {
        unsafe {
            MediaInfo_Close(self.handle);
            MediaInfo_Delete(self.handle);
        }
    }
}