"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

import UserMenu from "./UserMenu";

const MENU = [
  { label: "Головна", href: "/" },
  { label: "Posts", href: "/posts" },
];

export default function MainMenu() {
  const pathname = usePathname() || "/";

  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentTab = useMemo(() => {
    const idx = MENU.findIndex(
      (m) => pathname === m.href || pathname.startsWith(m.href + "/")
    );
    return idx === -1 ? false : idx;
  }, [pathname]);

  return (
    <AppBar position="sticky" color="default" elevation={3}>
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ mr: 2 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Задачки
            </Typography>
          </Link>
        </Box>

        <Box sx={{ flex: 1, display: { xs: "none", md: "flex" } }}>
          <Tabs value={currentTab}>
            {MENU.map((m, i) => (
              <Tab
                key={m.href}
                label={m.label}
                value={i}
                component={Link}
                href={m.href}
                sx={{ textTransform: "none" }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Мобільна кнопка */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {/* Якщо юзер Є → показати аватар */}
          <UserMenu />
        </Box>

        {/* Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 260 }} role="presentation">
            <List>
              {MENU.map((m) => (
                <ListItem key={m.href} disablePadding>
                  <ListItemButton component={Link} href={m.href}>
                    <Typography>{m.label}</Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
