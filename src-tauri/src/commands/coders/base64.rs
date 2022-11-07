use super::{
    base64_image::image_to_base64,
    base64_text::{decode_base64_text, encode_base64_text},
};

#[tauri::command]
pub fn base64_text(text: &str, is_encode: bool) -> Result<String, String> {
    let coded_text = match is_encode {
        true => Ok(encode_base64_text(text)),
        false => match decode_base64_text(text) {
            Ok(decoded_text) => Ok(decoded_text),
            Err(_) => Err("Unable to decode".to_string()),
        },
    };
    coded_text
}

#[tauri::command]
pub fn base64_image(file: &str) -> Result<String, String> {
    match image_to_base64(file) {
        Ok(text) => Ok(text),
        Err(_) => Err("Unable to convert image to base64".to_string()),
    }
}
