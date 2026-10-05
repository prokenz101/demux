use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;

#[tauri::command]
fn select_file(app: AppHandle) -> Option<String> {
    return app
        .dialog()
        .file()
        .add_filter(
            "Video",
            &[
                "webm", "mkv", "flv", "vob", "ogv", "ogg", "rrc", "gifv", "mng", "mov", "avi",
                "qt", "wmv", "yuv", "rm", "asf", "amv", "mp4", "m4p", "m4v", "mpg", "mp2", "mpeg",
                "mpe", "mpv", "m4v", "svi", "3gp", "3g2", "mxf", "roq", "nsv", "flv", "f4v", "f4p",
                "f4a", "f4b", "mod",
            ],
        )
        .blocking_pick_file()
        .map(|path| path.to_string());
}

use serde::Serialize;
use std::path::Path;

#[derive(Serialize)]
pub struct VideoResolution {
    width: u32,
    height: u32,
}

#[tauri::command]
fn get_resolution(path: String) -> Result<String, String> {
    ffmpeg_next::init().map_err(|e| e.to_string())?;

    let ictx = ffmpeg_next::format::input(&Path::new(&path))
        .map_err(|e| format!("Failed to open file {e}"))?;
    let best_video = ictx
        .streams()
        .best(ffmpeg_next::media::Type::Video)
        .ok_or_else(|| "No video stream found in file".to_string())?;

    let decoder = ffmpeg_next::codec::context::Context::from_parameters(best_video.parameters())
        .map_err(|e| format!("Failed to parse codec parameters: {e}"))?
        .decoder()
        .video()
        .map_err(|e| format!("Stream is not a valid video: {e}"))?;

    // Ok(VideoResolution {
    //     width: decoder.width(),
    //     height: decoder.height(),
    // })
    return Ok(format!("{}x{}", decoder.width(), decoder.height()));
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![select_file, get_resolution])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
