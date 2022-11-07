import { Button, Image, SimpleGrid, Stack, Textarea } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconChevronLeft, IconX } from "@tabler/icons";
import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToolBox } from "../../../components/DevTools/ToolBox";
import Dropzone from "../../../components/Dropzone/Dropzone";

export default function Base64Image() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(" ");

  /**
   * It opens a file dialog and converts the selected image to base64.
   */
  const handleDropzoneClick = () => {
    open({
      multiple: false,
      filters: [
        {
          name: "Image",
          extensions: ["png", "jpeg", "jpg", "bmp"],
        },
      ],
    }).then((file) => {
      console.log(file);
      if (file) {
        const notificationId = "image-coder-notification";
        showNotification({
          id: notificationId,
          title: "Converting Image to Base64",
          message:
            "Hey there, please wait a moment until operation is finished.",
          loading: true,
          autoClose: false,
          disallowClose: true,
        });
        setInputValue("");
        invoke<string>("base64_image", {
          file: file,
        })
          .then((response) => {
            setInputValue(response);
            updateNotification({
              id: notificationId,
              title: "Conversion success",
              message: "Converted image to base64",
              autoClose: 3000,
              icon: <IconCheck size={16} />,
              color: "green",
            });
          })
          .catch((error) => {
            showNotification({
              id: "image-coder-notification",
              title: `Image to base64 Failed`,
              message: error,
              autoClose: 3000,
              icon: <IconX size={16} />,
              color: "red",
            });
          });
      }
    });
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
          <SimpleGrid cols={2}>
            <Stack>
              <Dropzone onClick={handleDropzoneClick} />
              <Textarea
                placeholder="Base64"
                value={inputValue}
                onChange={(event) => setInputValue(event.currentTarget.value)}
                minRows={10}
              />
            </Stack>
            <Image src={inputValue} alt="Placeholder" withPlaceholder />
          </SimpleGrid>
        </Stack>
      </ToolBox>
    </>
  );
}
