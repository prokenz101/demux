use tauri_plugin_dialog::DialogExt;
use tauri::WebviewWindow;

mod ffmpeg;
use ffmpeg::{get_input_context, get_general_details};

#[tauri::command]
async fn select_file(window: WebviewWindow) -> Option<String> {
    window
        .dialog()
        .file()
        .set_parent(&window)
        // .add_filter(
        //     "Video",
        //     &[
        //         "webm", "mkv", "flv", "vob", "ogv", "ogg", "rrc", "gifv", "mng", "mov", "avi",
        //         "qt", "wmv", "yuv", "rm", "asf", "amv", "mp4", "m4p", "m4v", "mpg", "mp2", "mpeg",
        //         "mpe", "mpv", "m4v", "svi", "3gp", "3g2", "mxf", "roq", "nsv", "flv", "f4v", "f4p",
        //         "f4a", "f4b", "mod",
        //     ],
        // )
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
