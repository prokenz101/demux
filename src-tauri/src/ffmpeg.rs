use ffmpeg_next::{
    decoder::Video,
    format::{context::Input, stream::Disposition},
    media::Type,
};
use std::{fs::File, io::Read, path::Path};

/// Returns the ffmpeg media input context.
#[allow(dead_code)]
pub fn get_input_context(path: &String) -> Result<Input, String> {
    ffmpeg_next::init().map_err(|e| e.to_string())?;

    let ictx = ffmpeg_next::format::input(&Path::new(&path))
        .map_err(|e| format!("Failed to open file {e}"))?;

    Ok(ictx)
}

fn get_decoder(ictx: &Input) -> Result<Video, String> {
    let best_video = &ictx
        .streams()
        .best(Type::Video)
        .ok_or_else(|| "No video stream found in file".to_string())?;

    let decoder = ffmpeg_next::codec::context::Context::from_parameters(best_video.parameters())
        .map_err(|e| format!("Failed to parse codec parameters: {e}"))?
        .decoder()
        .video()
        .map_err(|e| format!("Stream is not a valid video: {e}"))?;

    Ok(decoder)
}

fn get_resolution(decoder: &Video) -> (u32, u32) {
    return (decoder.width(), decoder.height());
}

#[allow(dead_code)]
fn get_precise_format_name(cont_format: &ffmpeg_next::format::Input, path: &String) -> String {
    let cont_format_name = cont_format.name();
    const EBML_HEADER_SIZE: usize = 128;
    const ISOBMFF_HEADER_SIZE: usize = 64;

    fn get_header(file_path: &String, buf_size: usize) -> Option<Vec<u8>> {
        let mut file = File::open(file_path).ok()?;
        // let mut buffer = [0u8; buf_size];
        let mut buffer = vec![0u8; buf_size];
        let bytes_read = file.read(&mut buffer).ok()?;

        buffer.truncate(bytes_read);
        Some(buffer)
    }

        //* Checking EBML doctype to distinguish between Matroska and WebM
        fn check_ebml_doctype(path: &String) -> Option<String> {
            let header = get_header(path, EBML_HEADER_SIZE)?;
    match cfn.as_str() {

            if header.windows(4).any(|window| window == b"webm") {
                Some("WebM".to_string())
            } else if header.windows(4).any(|window| window == b"matr") {
                Some("Matroska".to_string())
            } else {
                None
            }
        }

        check_ebml_doctype(path).unwrap_or_else(|| cont_format.name().to_string())
    } else if cont_format_name == "mov,mp4,m4a,3gp,3g2,mj2" {
        //* Read ftyp box of ISOBMFF structure to distinguish these types
        fn check_isobmff_brand(path: &String) -> Option<String> {
            let header = get_header(path, ISOBMFF_HEADER_SIZE)?;

            //* The 'ftyp' atom type must appear at byte offset 4
            if header.len() < 12 || &header[4..8] != b"ftyp" {
                return None;
            }

            let major_brand = &header[8..12]; //* Major brand identifier is at offset 8

            Some(match major_brand {
                b"qt  " => "QuickTime".to_string(),
                b"avif" | b"avis" => "AVIF".to_string(),
                b"mif1" | b"mif2" | b"msf1" | b"msf2" | b"heic" | b"heix" | b"heim" | b"heis"
                | b"hevc" | b"hevx" => "HEIF".to_string(),
                b"jp2" | b"jpm" | b"jpx" => "JPEG 2000".to_string(),
                b"jxl" => "JPEG XL".to_string(),
                b if b.starts_with(b"3gp") => "3GPP".to_string(),
                b if b.starts_with(b"3g2") => "3GPP2".to_string(),
                b"dash" | b"drms" => "DASH".to_string(),
                _ => "MPEG-4".to_string(),
            })
        }

        check_isobmff_brand(path).unwrap_or_else(|| cont_format.name().to_string())
    } else {
        return cont_format.name().to_string();
    }
}

#[allow(dead_code)]
pub fn get_general_details(ictx: &Input, path: &String) -> String {
    let container_format = ictx.format();

    let decoder = get_decoder(&ictx).expect("Failed to get decoder");
    let (width, height) = get_resolution(&decoder);

    return format!(
        "Resolution: {}x{}\nFormat: {}\nDescription: {}",
        width,
        height,
        get_precise_format_name(&container_format, &path),
        container_format.description()
    );
}
