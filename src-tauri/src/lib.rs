use tauri::WebviewWindow;
use tauri_plugin_dialog::DialogExt;

pub mod ffmpeg;
pub mod containers;
use ffmpeg::{get_general_details, get_input_context};

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
    let ictx = get_input_context(&path).expect("Failed to get input context");
    Ok(get_general_details(&ictx, &path))
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
