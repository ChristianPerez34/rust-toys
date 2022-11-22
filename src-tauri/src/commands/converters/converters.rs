use super::{
    constants::{BMP, JPEG, JPG, JSON, PDF, PNG, YAML},
    utils::{
        convert_image_to_image, convert_image_to_pdf, convert_json_to_yaml, convert_yaml_to_json,
    },
};

#[tauri::command]
/// It takes a vector of file names and a file extension as arguments, and returns a `Result` with the
/// relevant success/error message.
///
/// Arguments:
///
/// * `files`: A vector of file paths to the images to be converted.
/// * `convert_to`: The file extension of the file you want to convert to.
///
/// Returns:
///
/// A Result<String, String>
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

#[tauri::command]
/// If the convert_to parameter is JSON, then convert the text to JSON, otherwise convert the text to
/// YAML
///
/// Arguments:
///
/// * `text`: The text to convert.
/// * `convert_to`: The format to convert to.
///
/// Returns:
///
/// A Result<String, String>
pub fn convert_json_yaml(text: &str, convert_to: &str) -> Result<String, String> {
    match convert_to {
        JSON => match convert_yaml_to_json(text) {
            Ok(json_text) => Ok(json_text),
            Err(_) => Err("Unable to convert to JSON".to_string()),
        },
        YAML => match convert_json_to_yaml(text) {
            Ok(yaml_text) => Ok(yaml_text),
            Err(_) => Err("Unable to convert to YAML".to_string()),
        },
        _ => Err("Unsupported operation".to_string()),
    }
}
