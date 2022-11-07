use std::{io::Cursor, path::Path};

use base64::encode;
use image::ImageError;

pub fn image_to_base64(file: &str) -> Result<String, ImageError> {
    let file_path = Path::new(file);
    let file_extension = file_path.extension().unwrap().to_str().unwrap();
    let image = image::open(file_path)?;
    let mut bytes: Vec<u8> = Vec::new();
    match file_extension {
        "png" => image.write_to(&mut Cursor::new(&mut bytes), image::ImageOutputFormat::Png)?,
        "jpeg" | "jpg" => image.write_to(
            &mut Cursor::new(&mut bytes),
            image::ImageOutputFormat::Jpeg(75),
        )?,
        "bmp" => image.write_to(&mut Cursor::new(&mut bytes), image::ImageOutputFormat::Bmp)?,
        _ => panic!(""),
    }

    Ok(format!(
        "data:image/{};base64,{}",
        file_extension,
        encode(&bytes)
    ))
}
