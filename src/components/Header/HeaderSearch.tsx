import {
  Autocomplete,
  Burger,
  createStyles,
  Group,
  Header,
  MediaQuery,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";
// import { useBoundStore } from "../store/store";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface HeaderSearchProps {
  height: number;
  opened: boolean;
  toggle: () => void;
}

export function HeaderSearch({ height, opened, toggle }: HeaderSearchProps) {
  const { classes } = useStyles();

  return (
    <Header height={height} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger opened={opened} onClick={toggle} size="sm" />
          </MediaQuery>

          <MantineLogo size={28} />
        </Group>

        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
          />
        </Group>
      </div>
    </Header>
  );
}
