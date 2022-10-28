import { AppShell, Header, Navbar } from "@mantine/core";
import { useState } from "react";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/ColorSchemeToggle";
import { HeaderSearch } from "../components/Header/HeaderSearch";
import { NavbarMinimal } from "../components/Navbar/MinimalNavbar";

export default function Layout({ children }) {
  const [opened, setOpened] = useState(false);

  const toggle = () => {
    console.log("toggle clicked", opened);
    setOpened(!opened);
  };

  return (
    <>
      <AppShell
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        header={
          <Header height={56} p="md">
            <HeaderSearch height={56} opened={opened} toggle={toggle} />
          </Header>
        }
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ base: 80 }}
          >
            <NavbarMinimal />
          </Navbar>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
