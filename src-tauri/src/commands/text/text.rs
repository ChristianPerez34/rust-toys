use printpdf::pattern;

use super::regex_tester::find_matches;

#[tauri::command]
pub fn regex_tester(text: &str, pattern: &str) -> Result<Vec<Vec<String>>, String> {
    match find_matches(text, pattern) {
        Ok(text) => Ok(text),
        Err(error) => Err(format!("{:?}", error)),
    }
}
