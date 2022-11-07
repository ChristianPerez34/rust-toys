use std::{string::FromUtf8Error, fmt::Display, error::Error};

use base64::DecodeError;

#[derive(Debug)]
pub enum CoderErr {
    DecodeErr(DecodeError),
    FromUtf8Err(FromUtf8Error),
}

impl Display for CoderErr {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            CoderErr::DecodeErr(decode_error) => write!(f, "{}", decode_error),
            CoderErr::FromUtf8Err(utf8_error) => write!(f, "{}", utf8_error),
        }
    }
}

impl Error for CoderErr {}

impl From<DecodeError> for CoderErr {
    fn from(err: DecodeError) -> Self {
        CoderErr::DecodeErr(err)
    }
}

impl From<FromUtf8Error> for CoderErr {
    fn from(err: FromUtf8Error) -> Self {
        CoderErr::FromUtf8Err(err)
    }
}