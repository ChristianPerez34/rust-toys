import { Box } from "@mantine/core";

type ToolBoxProps = {
  children: JSX.Element[] | JSX.Element;
};

export function ToolBox({ children }: ToolBoxProps) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        width: "auto",
        height: "100%",
      })}
    >
      {children}
    </Box>
  );
}
