import { Box, Button, Group, Stack } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconChevronLeft, IconX } from "@tabler/icons";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { useEffect, useState } from "react";
import { PreviewPdfDnD } from "./PreviewPdf";
import { useRouter } from "next/router";
import { ToolBox } from "../DevTools/ToolBox";
import { Preview } from "./UtilityTypes";

export function MergePdf() {
  const [previews, setPreviews] = useState<Preview[]>([]);
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);

  const disableButton = files.length <= 0;

  useEffect(() => {
    setPreviews(
      files.map((file) => {
        const filename = file.split("\\").at(-1) || file.split("/").at(-1);
        return { name: filename || "", filePath: file };
      })
    );
  }, [files]);

  const reorderPreviews = (startIndex: number, endIndex: number) => {
    const result = Array.from(previews);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setPreviews(result);
  };

  const handlePdfMergeButtonClick = () => {
    const notificationId = "merge-pdf";
    const files_ = previews.map((file) => file.filePath);
    showNotification({
      id: notificationId,
      title: "Merging Files",
      message:
        "Hey there, please wait a moment until your files finish merging.",
      loading: true,
      autoClose: false,
      disallowClose: true,
    });
    invoke("merge_pdf", { files: files_ })
      .then((message) => {
        updateNotification({
          id: notificationId,
          title: "Merge success",
          message: message as string,
          autoClose: 3000,
          icon: <IconCheck size={16} />,
          color: "green",
        });
      })
      .catch((error) => {
        updateNotification({
          id: notificationId,
          title: "Merge failed",
          message: error as string,
          autoClose: 3000,
          icon: <IconX size={16} />,
          color: "red",
        });
      });
  };

  const handleDropzoneClick = () => {
    open({
      multiple: true,
      filters: [
        {
          name: "PDF",
          extensions: ["pdf"],
        },
      ],
    }).then((files) => {
      if (Array.isArray(files) || files !== null) {
        setFiles(files as string[]);
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
            <IconChevronLeft />
          </Button>
          <Box
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              textAlign: "center",
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              cursor: "pointer",
              border: "2px dashed #373A40",

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
              },
            })}
            onClick={handleDropzoneClick}
          >
            Click to select PDF files to merge
          </Box>
          <Group spacing={"xs"} grow>
            <Button
              variant="outline"
              onClick={handlePdfMergeButtonClick}
              disabled={disableButton}
            >
              merge
            </Button>
            <Button variant="outline" onClick={() => setFiles([])}>
              clear
            </Button>
          </Group>
          <PreviewPdfDnD
            previews={previews}
            reorderPreviews={reorderPreviews}
          />
        </Stack>
      </ToolBox>
    </>
  );
}
