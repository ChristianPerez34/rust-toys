use std::{ffi::OsStr, fs::File, io::BufWriter, path::Path};

use image::ImageError;
use printpdf::{image_crate, Image, ImageTransform, Mm, PdfDocument};

use super::{
    constants::{BMP, JPEG, JPG, PNG},
    errors::ConverterError,
};

/// It takes a vector of file paths and a string representing the file type to convert to, and then
/// converts each file to the specified file type
///
/// Arguments:
///
/// * `files`: &Vec<&str> - A vector of file paths to convert.
/// * `convert_to`: The file extension to convert to.
///
/// Returns:
///
/// A Result<(), ConverterError>
pub fn convert_image_to_image(files: &Vec<&str>, convert_to: &str) -> Result<(), ConverterError> {
    for file in files {
        let file_path = Path::new(file);
        let parent_dir = file_path.parent().unwrap();
        let filename = file_path.file_stem().and_then(OsStr::to_str).unwrap();
        let image = image::open(file_path)?;
        image.save(&Path::new(&parent_dir.join(format!(
            "{}.{}",
            filename,
            convert_to.to_lowercase()
        ))))?;
    }
    Ok(())
}

/// It takes a file and an extension, and returns an image
///
/// Arguments:
///
/// * `image_file`: The image file to be read.
/// * `extension`: The extension of the image file.
///
/// Returns:
///
/// A Result<Image, ImageError>
pub fn get_image_file(image_file: &File, extension: &str) -> Result<Image, ImageError> {
    match extension {
        PNG => Image::try_from(image_crate::codecs::png::PngDecoder::new(image_file).unwrap()),
        JPG | JPEG => {
            Image::try_from(image_crate::codecs::jpeg::JpegDecoder::new(image_file).unwrap())
        }
        BMP => Image::try_from(image_crate::codecs::bmp::BmpDecoder::new(image_file).unwrap()),
        _ => panic!("Unsopported image file"),
    }
}

/// We open the image file, get the image dimensions, create a new PDF document, add the image to the
/// document, and save the document
///
/// Arguments:
///
/// * `files`: A vector of file paths to the images you want to convert.
///
/// Returns:
///
/// A Result<(), ConverterError>
pub fn convert_image_to_pdf(files: &Vec<&str>) -> Result<(), ConverterError> {
    for file in files {
        let file_path = Path::new(file);
        let parent_dir = file_path.parent().unwrap();
        let filename = file_path.file_stem().and_then(OsStr::to_str).unwrap();
        let dpi = 300.0;
        let file_extension = file_path
            .extension()
            .and_then(OsStr::to_str)
            .unwrap()
            .to_uppercase();
        let image_file = File::open(file_path).unwrap();
        let image: Image = get_image_file(&image_file, &file_extension).unwrap();
        let image_width = Mm::from(image.image.width.into_pt(dpi));
        let image_height = Mm::from(image.image.height.into_pt(dpi));
        let (doc, page1, layer1) =
            PdfDocument::new("PDF_Document_title", image_width, image_height, "Layer 1");
        let current_layer = doc.get_page(page1).get_layer(layer1);

        image.add_to_layer(
            current_layer.clone(),
            ImageTransform {
                ..Default::default()
            },
        );

        doc.save(&mut BufWriter::new(
            File::create(parent_dir.join(format!("{}.pdf", filename))).unwrap(),
        ))
        .unwrap()
    }
    Ok(())
}

/// It takes a JSON string, converts it to a YAML string, and returns the YAML string
///
/// Arguments:
///
/// * `json_text`: The JSON text to convert to YAML.
///
/// Returns:
///
/// A Result<String, serde_yaml::Error>
pub fn convert_json_to_yaml(json_text: &str) -> Result<String, serde_yaml::Error> {
    let yaml_from_json = serde_yaml::from_str::<serde_json::Value>(json_text)?;
    Ok(serde_yaml::to_string(&yaml_from_json)?)
}

/// It takes a YAML string, converts it to JSON, and returns the JSON string
///
/// Arguments:
///
/// * `yaml_text`: The YAML text to convert to JSON.
///
/// Returns:
///
/// A Result<String, serde_json::Error>
pub fn convert_yaml_to_json(yaml_text: &str) -> Result<String, serde_yaml::Error> {
    let json_from_yaml = serde_yaml::from_str::<serde_json::Value>(yaml_text)?;
    Ok(json_from_yaml.to_string())
}
