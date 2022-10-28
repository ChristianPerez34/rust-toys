use std::{error::Error, fmt::Display};

use image::ImageError;

#[derive(Debug)]
pub enum ConverterError {
    ConvertImageError(ImageError),
}

impl Display for ConverterError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ConverterError::ConvertImageError(convert_image_error) => {
                write!(f, "{}", convert_image_error)
            }
        }
    }
}

impl Error for ConverterError {}

impl From<ImageError> for ConverterError {
    fn from(err: ImageError) -> Self {
        ConverterError::ConvertImageError(err)
    }
}
