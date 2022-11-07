import { Box, Button, Group, Stack } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconChevronLeft, IconX } from "@tabler/icons";
// import { dialog, invoke } from "@tauri-apps/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToolBox } from "../../../components/DevTools/ToolBox";
import { Preview } from "../../../components/Pdf/PdfTypes";
import { PreviewPdfDnD } from "../../../components/Pdf/PreviewPdf";

export default function MergePdfPage() {
  const [previews, setPreviews] = useState<Preview[]>([]);
  const router = useRouter();

  const disableButton = previews.length <= 0;

  const reorderPreviews = (startIndex: number, endIndex: number) => {
    const result = Array.from(previews);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setPreviews(result);
  };

  const handlePdfMergeButtonClick = async () => {
    const { invoke } = await import("@tauri-apps/api");
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

    try {
      const message = await invoke<string>("merge_pdf", { files: files_ });
      updateNotification({
        id: notificationId,
        title: "Merge success",
        message: message,
        autoClose: 3000,
        icon: <IconCheck size={16} />,
        color: "green",
      });
    } catch (err) {
      updateNotification({
        id: notificationId,
        title: "Merge failed",
        message: err as string,
        autoClose: 3000,
        icon: <IconX size={16} />,
        color: "red",
      });
    }
  };

  const handleDropzoneClick = async () => {
    const { dialog } = await import("@tauri-apps/api");

    const selected = await dialog.open({
      multiple: true,
      filters: [
        {
          name: "PDF",
          extensions: ["pdf"],
        },
      ],
    });

    if (Array.isArray(selected)) {
      setPreviews(
        selected.map((file) => {
          const filename = file.split("\\").at(-1) || file.split("/").at(-1);
          return { name: filename || "", filePath: file };
        })
      );
    } else if (selected !== null) {
      const filename =
        selected.split("\\").at(-1) || selected.split("/").at(-1);
      setPreviews([{ name: filename || "", filePath: selected }]);
    }
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
            <Button variant="outline" onClick={() => setPreviews([])}>
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
