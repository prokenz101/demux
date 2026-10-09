use crate::containers::format::get_header;

pub fn check_isobmff_brand(path: &String) -> Option<&'static str> {
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
