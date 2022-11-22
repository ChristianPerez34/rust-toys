import {
  Stack,
  Button,
  NativeSelect,
  Group,
  SimpleGrid,
  Textarea,
  Space,
} from "@mantine/core";
import { IconChevronLeft, IconChevronDown } from "@tabler/icons";
import router from "next/router";
import { useState } from "react";
import { ToolBox } from "../../../components/DevTools/ToolBox";

export default function JsonYamlPage() {
  const textAreaMinRows = 8;
  const [convertTo, setConvertTo] = useState("JSON");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleConvertButtonClick = async () => {
    const { invoke } = await import("@tauri-apps/api");
    console.log(convertTo);
    try {
      const response = await invoke<string>("convert_json_yaml", {
        text: inputText,
        convertTo,
      });

      setOutputText(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearButtonClick = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <>
      <ToolBox>
        <Stack justify="center" spacing={"sm"}>
          <Button
            variant="subtle"
            compact
            style={{ width: "min-content" }}
            onClick={() => router.back()}
          >
            <IconChevronLeft />{" "}
          </Button>

          <NativeSelect
            label="Convert to..."
            placeholder="Your desired output"
            data={["JSON", "YAML"]}
            rightSection={<IconChevronDown size={14} />}
            rightSectionWidth={40}
            value={convertTo}
            onChange={(event) => setConvertTo(event.currentTarget.value)}
          />
          <Space h="xs" />
          <SimpleGrid cols={2}>
            <Textarea
              placeholder="Input text..."
              label="Input"
              radius="md"
              size="md"
              autosize
              minRows={textAreaMinRows}
              maxRows={textAreaMinRows * 2}
              value={inputText}
              onChange={(event) => setInputText(event.currentTarget.value)}
            />
            <Textarea
              placeholder="Output text..."
              label="Output"
              radius="md"
              size="md"
              autosize
              minRows={textAreaMinRows}
              maxRows={textAreaMinRows * 2}
              value={outputText}
              onChange={(event) => setOutputText(event.currentTarget.value)}
            />
          </SimpleGrid>
          <Space h="md" />
          <Group spacing={"xs"} grow>
            <Button variant="outline" onClick={handleConvertButtonClick}>
              convert
            </Button>
            <Button variant="outline" onClick={handleClearButtonClick}>
              clear
            </Button>
          </Group>
        </Stack>
      </ToolBox>
    </>
  );
}
