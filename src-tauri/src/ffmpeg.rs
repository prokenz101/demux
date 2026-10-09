use crate::containers::format::get_precise_format_name;
use ffmpeg_next::{
    decoder::Video,
    format::{context::Input, stream::Disposition},
    media::Type,
};
use std::path::Path;

/// Returns the ffmpeg media input context.
#[allow(dead_code)]
pub fn get_input_context(path: &String) -> Result<Input, String> {
    ffmpeg_next::init().map_err(|e| e.to_string())?;

    let ictx = ffmpeg_next::format::input(&Path::new(&path))
        .map_err(|e| format!("Failed to open file {e}"))?;

    Ok(ictx)
}

pub fn get_decoder(ictx: &Input) -> Result<Video, String> {
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
pub fn get_general_details(ictx: &Input, path: &String) -> String {
    let mut detail = String::new();
    detail.push_str(&format!("File path: {}\n", path));

    if has_actual_video_streams(ictx) {
        let decoder = get_decoder(ictx).expect("Failed to get decoder");
        let (width, height) = get_resolution(&decoder);

        detail.push_str(&format!("Resolution: {}x{}\n", width, height));
    }

    detail.push_str(&format!(
        "Format: {}\n",
        get_precise_format_name(ictx, path)
    ));
    detail
}

pub fn has_video_streams(ictx: &Input) -> bool {
    ictx.streams()
        .any(|stream| stream.parameters().medium() == ffmpeg_next::media::Type::Video)
}

/// Used to differentiate between media with an actual video stream and media with just an image/cover art.
pub fn has_actual_video_streams(ictx: &Input) -> bool {
    let mut video_streams_are_videos = false;

    if has_video_streams(ictx) {
        let streams = ictx.streams();

        for stream in streams.filter(|s| s.parameters().medium() == Type::Video) {
            if !stream.disposition().contains(Disposition::ATTACHED_PIC) && stream.duration() != 0 {
                video_streams_are_videos = true; //* Video stream is an actual video, not cover art
                break;
            }
        }

        if video_streams_are_videos {
            true
        } else {
            false
        }
    } else {
        false
    }
}

pub fn get_audio_codec_name(ictx: &Input) -> Result<String, String> {
    let best_audio = &ictx
        .streams()
        .best(Type::Audio)
        .ok_or_else(|| "No audio stream found in container")?;
    let decoder = ffmpeg_next::codec::context::Context::from_parameters(best_audio.parameters())
        .map_err(|_e| "Failed to parse codec parameters")?
        .decoder()
        .audio()
        .map_err(|_e| "Stream is not a valid audio")?;

    let codec = decoder.codec().unwrap();
    Ok(codec.name().to_string())
}
