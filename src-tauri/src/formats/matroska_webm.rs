use crate::formats::format::get_header;

pub fn check_ebml_doctype(path: &String) -> Option<&'static str> {
    let header = get_header(path, 128)?;

    if header.windows(4).any(|window| window == b"webm") {
        Some("WebM")
    } else if header.windows(4).any(|window| window == b"matr") {
        Some("Matroska")
    } else {
        None
    }
}
