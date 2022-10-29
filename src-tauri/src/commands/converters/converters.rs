use super::{
    constants::{BMP, JPEG, JPG, PNG, PDF},
    utils::{convert_image_to_image, convert_image_to_pdf},
};

#[tauri::command]
pub fn convert_image(files: Vec<&str>, convert_to: &str) -> Result<String, String> {
    match convert_to {
        PNG | JPG | JPEG | BMP => match convert_image_to_image(&files, convert_to) {
            Ok(_) => Ok("Image to image conversion successful".to_string()),
            Err(_) => Err("Image to image conversion failed".to_string()),
        },
        PDF => match convert_image_to_pdf(&files) {
            Ok(_) => Ok("Image to PDF conversion successful".to_string()),
            Err(_) => Err("Image to PDF conversion failed".to_string()),
        },
        _ => Err(format!("Unsupported file extension: {}", convert_to)),
    }
}
