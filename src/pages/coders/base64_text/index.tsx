import { Button, Divider, Group, Stack, Switch, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconChevronLeft, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToolBox } from "../../../components/DevTools/ToolBox";

export default function Base64TextPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleCoderButtonClick = async () => {
    const { invoke } = await import("@tauri-apps/api");
    const notificationId = "coder-notification";

    try {
      const coded_text = await invoke<string>("base64_text", {
        text: inputValue,
        isEncode: checked,
      });
      setOutputValue(coded_text);
      showNotification({
        id: notificationId,
        title: `Text ${checked ? "encode" : "decode"} success`,
        message: "View coded text",
        autoClose: 3000,
        icon: <IconCheck size={16} />,
        color: "green",
      });
    } catch (error) {
      showNotification({
        id: notificationId,
        title: `Text ${checked ? "encode" : "decode"} failed`,
        message: error as string,
        autoClose: 3000,
        icon: <IconX size={16} />,
        color: "red",
      });
    }
  };

  return (
    <>
      <ToolBox>
        <Stack justify="center" spacing={"sm"}>
          <Group position="apart">
            <Button
              variant="subtle"
              compact
              style={{ width: "min-content" }}
              onClick={() => router.back()}
            >
              <IconChevronLeft />{" "}
            </Button>
            <Switch
              onLabel="ENCODE"
              offLabel="DECODE"
              size="lg"
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          </Group>
          <Textarea
            label="Input Text"
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
          />
          <Divider my="sm" />
          <Textarea
            label="Output Text"
            value={outputValue}
            onChange={(event) => setOutputValue(event.currentTarget.value)}
          />
          <Group spacing={"xs"} grow>
            <Button variant="outline" onClick={handleCoderButtonClick}>
              {checked ? "encode" : "decode"}
            </Button>
          </Group>
        </Stack>
      </ToolBox>
    </>
  );
}
