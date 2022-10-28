use std::{path::Path, ffi::OsStr};

use super::errors::ConverterError;

pub fn convert_image_to_image(
    files: &Vec<&str>,
    convert_to: &str,
) -> Result<(), ConverterError> {
    for file in files{
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
