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

fn get_precise_format_name(ictx: &Input, path: &String) -> String {
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
        "mpeg" | "mpegvideo" => {
            check_mpeg_ps(path, &cfn).unwrap_or_else(|| cfn.clone())
        }
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
        },
        "hevc" => "HEVC (h265)".to_owned(),
        "h264" => "AVC (h264)".to_owned(),
        _ => cfn.clone()
    }
}

#[allow(dead_code)]
pub fn get_general_details(ictx: &Input, path: &String) -> String {
    let container_format = ictx.format();

    if has_video_streams(ictx) {
        let decoder = get_decoder(ictx).expect("Failed to get decoder");
        let (width, height) = get_resolution(&decoder);

        return format!(
            "Resolution: {}x{}\nFormat: {}\nDescription: {}",
            width,
            height,
            get_precise_format_name(ictx, path),
            container_format.description()
        );
    } else {
        return format!(
            "No video stream detected.\nFormat: {}\nDescription: {}",
            get_precise_format_name(ictx, path),
            container_format.description()
        );
    }
}

pub fn has_video_streams(ictx: &Input) -> bool {
    ictx.streams()
        .any(|stream| stream.parameters().medium() == ffmpeg_next::media::Type::Video)
}

//* For get_precise_format()

fn get_header(file_path: &String, buf_size: usize) -> Option<Vec<u8>> {
    let mut file = File::open(file_path).ok()?;
    // let mut buffer = [0u8; buf_size];
    let mut buffer = vec![0u8; buf_size];
    let bytes_read = file.read(&mut buffer).ok()?;

    buffer.truncate(bytes_read);
    Some(buffer)
}

fn check_ebml_doctype(path: &String) -> Option<&'static str> {
    let header = get_header(path, 128)?;

    if header.windows(4).any(|window| window == b"webm") {
        Some("WebM")
    } else if header.windows(4).any(|window| window == b"matr") {
        Some("Matroska")
    } else {
        None
    }
}

fn check_isobmff_brand(path: &String) -> Option<&'static str> {
    let header = get_header(path, 64)?;

    //* The 'ftyp' atom type must appear at byte offset 4
    if header.len() < 12 || &header[4..8] != b"ftyp" {
        return None;
    }

    let major_brand = &header[8..12]; //* Major brand identifier is at offset 8

    Some(match major_brand {
        b"qt  " => "QuickTime",
        b"avif" | b"avis" => "AVIF",
        b"mif1" | b"mif2" | b"msf1" | b"msf2" | b"heic" | b"heix" | b"heim" | b"heis" | b"hevc"
        | b"hevx" => "HEIF",
        b"jp2" | b"jpm" | b"jpx" => "JPEG 2000",
        b"jxl" => "JPEG XL",
        b if b.starts_with(b"3gp") => "3GPP",
        b if b.starts_with(b"3g2") => "3GPP2",
        b"dash" | b"drms" => "DASH",
        _ => "MPEG-4",
    })
}

fn check_mpeg_ps(path: &String, cont_format_name: &str) -> Option<String> {
    let header = get_header(path, 64)?;

    if header.len() >= 4 && &header[0..3] == [0x00, 0x00, 0x01] {
        match header[3] {
            0xBA => Some("MPEG-PS".to_owned()),
            0xB3 => Some("MPEG Video".to_owned()),
            _ => Some(cont_format_name.to_owned()),
        }
    } else {
        Some(cont_format_name.to_owned())
    }
}

fn get_audio_codec_name(ictx: &Input) -> Result<String, String> {
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

fn is_rm(ictx: &Input) -> bool {
    let decoder = get_decoder(ictx).expect("Failed to get decoder");
    decoder.max_bit_rate() == decoder.bit_rate()
    //* If the maximum bitrate is greater than the average bitrate, then it must be of constant bitrate
}
