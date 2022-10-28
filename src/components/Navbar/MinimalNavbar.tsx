import { Navbar, Stack } from "@mantine/core";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconTools,
  IconUser,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { NavbarLink } from "./NavbarLink";

const linksData = [
  { icon: IconHome2, label: "All tools", links_to: "/" },
  { icon: IconGauge, label: "Converters", links_to: "/converters" },
  { icon: IconTools, label: "Utilities", links_to: "/utilities" },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Encoders / Decoders",
    links_to: "/coders",
  },
  { icon: IconCalendarStats, label: "Formatters", links_to: "/formatters" },
  { icon: IconUser, label: "Generators", links_to: "/generators" },
  { icon: IconFingerprint, label: "Text", links_to: "/text" },
  { icon: IconSettings, label: "Graphic", links_to: "/graphic" },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(0);

  // useEffect(() => {
  //   setActive(0);
  // }, []);

  const links = linksData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <>
      <Navbar.Section mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
    </>
  );
}
