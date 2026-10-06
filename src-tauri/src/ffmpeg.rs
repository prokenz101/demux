use ffmpeg_next::{decoder::Video, format::context::Input};
use std::{fs::File, io::Read, path::Path};

/// Returns the ffmpeg media input context.
#[allow(dead_code)]
pub fn get_input_context(path: &String) -> Result<Input, String> {
    ffmpeg_next::init().map_err(|e| e.to_string())?;

    let ictx = ffmpeg_next::format::input(&Path::new(&path))
        .map_err(|e| format!("Failed to open file {e}"))?;

    Ok(ictx)
}

#[allow(dead_code)]
fn get_decoder(ictx: &Input) -> Result<Video, String> {
    let best_video = &ictx
        .streams()
        .best(ffmpeg_next::media::Type::Video)
        .ok_or_else(|| "No video stream found in file".to_string())?;

    let decoder = ffmpeg_next::codec::context::Context::from_parameters(best_video.parameters())
        .map_err(|e| format!("Failed to parse codec parameters: {e}"))?
        .decoder()
        .video()
        .map_err(|e| format!("Stream is not a valid video: {e}"))?;

    Ok(decoder)
}

#[allow(dead_code)]
fn get_resolution(decoder: &Video) -> (u32, u32) {
    return (decoder.width(), decoder.height());
}

