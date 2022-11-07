import { Button, Group, NativeSelect, Stack } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconX,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToolBox } from "../../../components/DevTools/ToolBox";
import Dropzone from "../../../components/Dropzone/Dropzone";

const selectData = ["BMP", "JPG", "PNG", "PDF"];

export default function ImageConverterPage() {
  const router = useRouter();
  const [selectValue, setSelectValue] = useState("bmp");
  const [files, setFiles] = useState<string[]>([]);

  const handleImageConvertButtonClick = async () => {
    const { invoke } = await import("@tauri-apps/api");
    const notificationId = "convert-image";
    showNotification({
      id: notificationId,
      title: "Converting Images",
      message: "Hey there, please wait a moment until conversion is finished.",
      loading: true,
      autoClose: false,
      disallowClose: true,
    });
    try {
      const response = await invoke<string>("convert_image", {
        files: files,
        convertTo: selectValue,
      });
      updateNotification({
        id: notificationId,
        title: "Conversion success",
        message: response,
        autoClose: 3000,
        icon: <IconCheck size={16} />,
        color: "green",
      });
    } catch (error) {
      updateNotification({
        id: notificationId,
        title: "Conversion failed",
        message: error,
        autoClose: 3000,
        icon: <IconX size={16} />,
        color: "red",
      });
    }
  };

  const handleDropzoneClick = async () => {
    const { dialog } = await import("@tauri-apps/api");
    const files = await dialog.open({
      multiple: true,
      filters: [
        {
          name: "Image",
          extensions: ["png", "jpeg", "jpg", "bmp"].filter((extension) => {
            let value = selectValue.toLocaleLowerCase();
            if (value === "jpg") {
              return extension !== value && extension !== "jpeg";
            }
            return extension !== value;
          }),
        },
      ],
    });
    if (Array.isArray(files) || files !== null) {
      setFiles(files as string[]);
    }
  };

  const disableButton = files.length <= 0;

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
            label="Convert image to..."
            placeholder="Your desired output"
            data={selectData}
            rightSection={<IconChevronDown size={14} />}
            rightSectionWidth={40}
            onChange={(event) => setSelectValue(event.currentTarget.value)}
            defaultValue={selectData[0]}
          />
          <Dropzone onClick={handleDropzoneClick} />
          <Group spacing={"xs"} grow>
            <Button
              variant="outline"
              onClick={handleImageConvertButtonClick}
              disabled={disableButton}
            >
              convert
            </Button>
            <Button variant="outline" onClick={() => setFiles([])}>
              clear
            </Button>
          </Group>
        </Stack>
      </ToolBox>
    </>
  );
}
