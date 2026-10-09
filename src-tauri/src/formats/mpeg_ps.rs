use crate::formats::format::get_header;

pub fn check_mpeg_ps(path: &String, cont_format_name: &str) -> Option<String> {
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
