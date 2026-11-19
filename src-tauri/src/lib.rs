use std::path::Path;
use tauri::WebviewWindow;
use tauri_plugin_dialog::DialogExt;

// pub mod containers;
// pub mod ffmpeg;
pub mod mediainfo;

fn include_all_fields(
    mi: &mediainfo::MediaInfo,
    json: &mut serde_json::Value,
) -> Result<(), String> {
    let tracks = json
        .pointer_mut("/media/track")
        .and_then(serde_json::Value::as_array_mut)
        .ok_or_else(|| "MediaInfo JSON is missing its media track list".to_string())?;
    let mut matched_tracks = vec![false; tracks.len()];

    for (kind, type_name) in [
        (mediainfo::StreamKind::General, "General"),
        (mediainfo::StreamKind::Video, "Video"),
        (mediainfo::StreamKind::Audio, "Audio"),
        (mediainfo::StreamKind::Text, "Text"),
        (mediainfo::StreamKind::Other, "Other"),
        (mediainfo::StreamKind::Image, "Image"),
        (mediainfo::StreamKind::Menu, "Menu"),
    ] {
        for stream_index in 0..mi.count_streams(kind) {
            let existing_track_index = tracks
                .iter()
                .enumerate()
                .find(|(index, track)| {
                    !matched_tracks[*index]
                        && track.get("@type").and_then(serde_json::Value::as_str) == Some(type_name)
                })
                .map(|(index, _)| index);
            let track_index = if let Some(index) = existing_track_index {
                index
            } else {
                tracks.push(serde_json::json!({ "@type": type_name }));
                matched_tracks.push(false);
                tracks.len() - 1
            };
            matched_tracks[track_index] = true;

            let track = tracks[track_index]
                .as_object_mut()
                .ok_or_else(|| "MediaInfo JSON contains a non-object track".to_string())?;
            for field_index in 0..mi.count_fields(kind, stream_index) {
                let name = mi.get_field(kind, stream_index, field_index, mediainfo::InfoKind::Name);
                if name.is_empty() {
                    continue;
                }

                let value =
                    mi.get_field(kind, stream_index, field_index, mediainfo::InfoKind::Text);
                track
                    .entry(name)
                    .or_insert_with(|| serde_json::Value::String(value));
            }
        }
    }

    Ok(())
}

#[tauri::command]
async fn select_file(window: WebviewWindow) -> Option<String> {
    window
        .dialog()
        .file()
        .set_parent(&window)
        .blocking_pick_file()
        .map(|path| path.to_string())
}

#[tauri::command]
fn open_file(path: String) -> Result<(), String> {
    open::that(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn open_enclosing_folder(path: String) -> Result<(), String> {
    tauri_plugin_opener::reveal_item_in_dir(Path::new(&path))
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn list_details(path: String) -> Result<String, String> {
    let mi = mediainfo::MediaInfo::new();
    mi.set_option("Inform", "JSON");
    mi.set_option("ParseSpeed", "0");
    mi.set_option("Complete", "1");
    mi.open(path)?;

    let json_raw = mi.inform();

    let json: serde_json::Value = serde_json::from_str(&json_raw)
        .map_err(|error| format!("Failed to parse MediaInfo JSON: {error}"))?;
    // let mut json: serde_json::Value = serde_json::from_str(&json_raw)
    //     .map_err(|error| format!("Failed to parse MediaInfo JSON: {error}"))?;
    // include_all_fields(&mi, &mut json)?;
    let pretty_json = serde_json::to_string_pretty(&json)
        .map_err(|error| format!("Failed to pretty-print MediaInfo JSON: {error}"))?;

    Ok(pretty_json)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            select_file,
            list_details,
            open_file,
            open_enclosing_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
