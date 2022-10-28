use super::{
    constants::{BMP, JPEG, JPG, PNG},
    utils::convert_image_to_image,
};


#[tauri::command]
pub fn convert_image(files: Vec<&str>, convert_to: &str) -> Result<String, String> {
    match convert_to {
        PNG | JPG | JPEG | BMP => match convert_image_to_image(&files, convert_to) {
            Ok(_) => Ok("Image conversion successful".to_string()),
            Err(_) => Err("Image conversion failed".to_string()),
        }
        _ => {
            Err(format!("Unsupported file extension: {}", convert_to))
        },
    }
    //    Ok("".to_string())
    //    for file in &files {
    //        let file_path = Path::new(file);
    //        let parent_dir = file_path.parent().unwrap();
    //        let filename = file_path.file_stem().and_then(OsStr::to_str).unwrap();
    //        if matches!(convert_to, PNG | JPG | JPEG | BMP) {
    //           if let Ok(result) = _convert_image(
    //                        &file_path,
    //                        &parent_dir,
    //                        &filename,
    //                        &convert_to.to_lowercase(),
    //                    ) {
    //            result
    //        } else {
    //            Err("".to_string())
    //        }
    //        }
    //        match convert_to {
    //            PNG | JPG | JPEG | BMP => {
    //                match _convert_image(
    //                    &file_path,
    //                    &parent_dir,
    //                    &filename,
    //                    &convert_to.to_lowercase(),
    //                ) {
    //                    Ok(result) => Ok(result),
    //                    Err(_) => Err("".to_string()),
    //                }
    //            }
    //            PDF => {
    //                let dpi = 300.0;
    //                let file_extension = file_path
    //                    .extension()
    //                    .and_then(OsStr::to_str)
    //                    .unwrap()
    //                    .to_uppercase();
    //                let image_file = File::open(file_path).unwrap();
    //                let image: Image = get_image_file(&image_file, &file_extension).unwrap();
    //                let image_width = Mm::from(image.image.width.into_pt(dpi));
    //                let image_height = Mm::from(image.image.height.into_pt(dpi));
    //                let (doc, page1, layer1) =
    //                    PdfDocument::new("PDF_Document_title", image_width, image_height, "Layer 1");
    //                let current_layer = doc.get_page(page1).get_layer(layer1);
    //
    //                image.add_to_layer(
    //                    current_layer.clone(),
    //                    ImageTransform {
    //                        ..Default::default()
    //                    },
    //                );
    //
    //                doc.save(&mut BufWriter::new(
    //                    File::create(parent_dir.join(format!("{}.pdf", filename))).unwrap(),
    //                ))
    //                .unwrap();
    //                ""
    //            }
    //            _ => "",
    //        }
    //    }
}
