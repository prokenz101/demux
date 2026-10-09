use std::{fs::File, io::Read};

use crate::ffmpeg::{get_audio_codec_name, has_video_streams};
use crate::containers::{
    matroska_webm::check_ebml_doctype, mp4::check_isobmff_brand, mpeg_ps::check_mpeg_ps, rm::is_rm,
};
use ffmpeg_next::format::{context::Input, stream::Disposition};
use ffmpeg_next::media::Type;

pub fn get_precise_format_name(ictx: &Input, path: &String) -> String {
    let container_format = ictx.format();
    let cfn = container_format.name().to_owned(); //* Container format name

    match cfn.as_str() {
        "matroska,webm" => check_ebml_doctype(path)
            .map(str::to_owned)
            .unwrap_or_else(|| cfn.clone()),
        "mov,mp4,m4a,3gp,3g2,mj2" => check_isobmff_brand(path)
            .map(str::to_owned)
            .unwrap_or_else(|| cfn.clone()),
        "mp3" => "MPEG Audio".to_owned(),
        "webp_pipe" => "WebP".to_owned(),
        "mpegts" => "MPEG-TS".to_owned(),
        "mpeg" | "mpegvideo" => check_mpeg_ps(path, &cfn).unwrap_or_else(|| cfn.clone()),
        "ogg" => {
            //? https://xiph.org/ogg/doc/rfc5334.txt
            let mut video_streams_are_videos = false;

            if has_video_streams(ictx) {
                //* Could be .ogv, or it could be album/cover art showing up as video
                let streams = ictx.streams();

                for stream in streams.filter(|s| s.parameters().medium() == Type::Video) {
                    if !stream.disposition().contains(Disposition::ATTACHED_PIC)
                        && stream.duration() != 0
                    {
                        video_streams_are_videos = true; //* Video stream is an actual video, not cover art
                        break;
                    }
                }

                if video_streams_are_videos {
                    return "Ogg Video".to_owned();
                }
            }

            if !video_streams_are_videos {
                let codec_name = get_audio_codec_name(ictx).ok().unwrap();
                return match codec_name.as_str() {
                    "opus" => "Opus Audio".to_owned(),
                    "vorbis" => "Ogg Vorbis".to_owned(),
                    "flac" => "Ogg FLAC".to_owned(),
                    "speex" => "Speex audio".to_owned(),
                    _ => "Ogg Audio".to_owned(),
                };
            } else {
                return cfn.clone();
            }
        }
        "asf" => "Windows Media (ASF)".to_owned(),
        "flv" => "Flash Video".to_owned(),
        "flac" => "FLAC".to_owned(),
        "aac" => "ADTS (AAC)".to_owned(),
        "rm" => {
            if is_rm(ictx) {
                return "RealMedia".to_owned();
            }

            if path.ends_with(".rmvb") {
                //* Fallback due to lack of reliable methods to distinguish rm and rmvb
                return "RealMedia Variable Bitrate".to_owned();
            } else {
                return "RealMedia".to_owned();
            }
        }
        "hevc" => "HEVC (h265)".to_owned(),
        "h264" => "AVC (h264)".to_owned(),
        "aiff" => "AIFF".to_owned(),
        _ => cfn.clone(),
    }
}

pub fn get_header(file_path: &String, buf_size: usize) -> Option<Vec<u8>> {
    let mut file = File::open(file_path).ok()?;
    // let mut buffer = [0u8; buf_size];
    let mut buffer = vec![0u8; buf_size];
    let bytes_read = file.read(&mut buffer).ok()?;

    buffer.truncate(bytes_read);
    Some(buffer)
}
