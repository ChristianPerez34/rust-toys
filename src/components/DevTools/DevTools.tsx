import {
  Card,
  createStyles,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconAB2,
  IconCashBanknote,
  IconCoin,
  IconFiles,
  IconLetterB,
  IconPhotoEdit,
  IconReceipt,
  IconReceiptRefund,
  IconReceiptTax,
  IconRepeat,
  IconReport,
} from "@tabler/icons";
import Link from "next/link";
// import { Link, useLocation } from "react-router-dom";

export interface DevToolsGridProps {
  title: string;
  tag: string;
}

const actionsGridData = [
  {
    title: "Image Converter",
    icon: IconPhotoEdit,
    color: "violet",
    description: "Image conversion",
    link_to: "/converters/image",
    tags: ["all", "converters"],
  },
  {
    title: "Merge PDF files",
    icon: IconFiles,
    color: "indigo",
    description: "Merges PDF files into a single file",
    link_to: "/utilities/merge_pdf",
    tags: ["all", "utilities"],
  },
  {
    title: "Base64 Text",
    icon: IconAB2,
    color: "blue",
    description: "Encode/Decode base64 text",
    link_to: "/coders/base64_text",
    tags: ["all", "coders"],
  },
  {
    title: "Place holder 2",
    icon: IconReceiptRefund,
    color: "green",
    description: "Placeholder",
    link_to: "/",
    tags: ["all"],
  },
  {
    title: "Place holder 3",
    icon: IconReceipt,
    color: "teal",
    description: "Placeholder",
    link_to: "/",
    tags: ["all"],
  },
  {
    title: "Place holder 4",
    icon: IconReceiptTax,
    color: "cyan",
    description: "Placeholder",
    link_to: "/",
    tags: ["all"],
  },
  {
    title: "Place holder 5",
    icon: IconReport,
    color: "pink",
    description: "Placeholder",
    link_to: "/",
    tags: ["all"],
  },
  {
    title: "Place holder 6",
    icon: IconCoin,
    color: "red",
    description: "Placeholder",
    link_to: "/",
    tags: ["all"],
  },
  {
    title: "Place holder 7",
    icon: IconCashBanknote,
    color: "orange",
    description: "Placeholder",
    link_to: "/",
    tags: ["all"],
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

export function DevToolsGrid({ title, tag }: DevToolsGridProps) {
  const { classes, theme } = useStyles();

  const items = actionsGridData.map((item) => {
    const { title, link_to, color, description, tags } = item;
    if (tags.includes(tag)) {
      return (
        <UnstyledButton
          key={title}
          className={classes.item}
          component={Link}
          href={link_to}
        >
          <item.icon color={theme.colors[color][6]} size={32} />
          <Text size="xs" mt={7}>
            {title}
          </Text>
          <Text size="xs" mt={3}>
            {description}
          </Text>
        </UnstyledButton>
      );
    }
  });

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>{title}</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
