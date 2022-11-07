import { Box } from "@mantine/core";
import { DropzoneProps } from "./types";

export default function Dropzone({ onClick }: DropzoneProps) {
  return (
    <>
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
        onClick={onClick}
      >
        Click to select files
      </Box>
    </>
  );
}
