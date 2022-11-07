#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
use commands::coders::base64::{base64_image, base64_text};
use commands::converters::converters::convert_image;
use commands::utilities::pdf::merge_pdf;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            convert_image,
            merge_pdf,
            base64_text,
            base64_image,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
