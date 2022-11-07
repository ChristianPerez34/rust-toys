import { Box, Stack, Textarea } from "@mantine/core";
import { useState } from "react";
import Highlighter from "react-highlight-words";

export default function RegexPage() {
  const [text, setText] = useState("");
  const [pattern, setPattern] = useState("");
  const [regex, setRegex] = useState(new RegExp(""));

  const handlePatternChange = (pattern) => {
    setPattern(pattern);

    try {
      let _regex = new RegExp(pattern);
      setRegex(_regex);
    } catch (error) {
      setRegex(new RegExp("pattern"));
    }
  };

  return (
    <>
      <Stack>
        <Textarea
          label="Regex Pattern"
          value={pattern}
          onChange={(event) => handlePatternChange(event.target.value)}
        />
        <Box>
          <Highlighter searchWords={[regex]} textToHighlight={text} />
        </Box>

        <Textarea
          label="Input Text"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          maxRows={15}
        ></Textarea>
      </Stack>
    </>
  );
}
