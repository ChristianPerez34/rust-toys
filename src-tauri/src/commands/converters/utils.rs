use std::{ffi::OsStr, path::Path, fs::File, io::BufWriter};

use image::ImageError;
use printpdf::{Image, image_crate, Mm, PdfDocument, ImageTransform};

use super::{errors::ConverterError, constants::{JPG, JPEG, BMP, PNG}};

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
