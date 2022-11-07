use base64::{decode, encode};

use super::errors::CoderErr;

pub fn encode_base64_text(text: &str) -> String {
    let encoded_text = encode(text.as_bytes());
    encoded_text
}

pub fn decode_base64_text(text: &str) -> Result<String, CoderErr> {
    let decoded_bytes = decode(text)?;
    let decoded_text = String::from_utf8(decoded_bytes)?;
    Ok(decoded_text)
}
