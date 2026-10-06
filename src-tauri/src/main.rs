// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod ffmpeg;
// mod brands;

fn main() {
    demux_lib::run()
}
