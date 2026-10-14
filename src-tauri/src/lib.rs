use tauri::WebviewWindow;
use tauri_plugin_dialog::DialogExt;

// pub mod containers;
// pub mod ffmpeg;
pub mod mediainfo;

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
fn list_details(path: String) -> Result<String, String> {
    // let ictx = get_input_context(&path).expect("Failed to get input context");
    // Ok(get_general_details(&ictx, &path))
    let mi = mediainfo::MediaInfo::new();
    mi.set_option("Inform", "JSON");
    mi.set_option("ParseSpeed", "0");
    mi.set_option("Complete", "1");
    mi.open(path)?;

    // let format = mi.get(mediainfo::StreamKind::General, 0, "Format");
    // let codec = mi.get(mediainfo::StreamKind::Video, 0, "Format");
    // Ok(format!("Format: {}\nCodec: {}", format, codec))
    let json_raw = mi.inform();

    let json: serde_json::Value = serde_json::from_str(&json_raw)
        .map_err(|error| format!("Failed to parse MediaInfo JSON: {error}"))?;
    let pretty_json = serde_json::to_string_pretty(&json)
        .map_err(|error| format!("Failed to pretty-print MediaInfo JSON: {error}"))?;

    Ok(pretty_json)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![select_file, list_details])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
