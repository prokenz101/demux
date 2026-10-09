use crate::ffmpeg::get_decoder;
use ffmpeg_next::format::context::Input;

pub fn is_rm(ictx: &Input) -> bool {
    let decoder = get_decoder(ictx).expect("Failed to get decoder");
    decoder.max_bit_rate() == decoder.bit_rate()
    //* If the maximum bitrate is greater than the average bitrate, then it must be of constant bitrate
}
