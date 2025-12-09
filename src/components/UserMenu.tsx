"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import { useAuth } from "@/stores/useAuth";
import { getGravatarUrl } from "@/lib/gravatar";

export default function UserMenu() {
  const router = useRouter();

  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (!user) {
    return (
      <MenuItem onClick={() => router.push("/auth/login")}>Логін</MenuItem>
    );
  }

  const avatarUrl = getGravatarUrl(user.email, 80);

  return (
    <>
      <Tooltip title="Профіль">
        <IconButton onClick={handleClick}>
          <Avatar src={avatarUrl} alt={user.displayName} />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            router.push("/profile");
          }}
        >
          Профіль
        </MenuItem>

        {user.role === "admin" && (
          <MenuItem
            onClick={() => {
              handleClose();
              router.push("/admin");
            }}
          >
            Адмінка
          </MenuItem>
        )}

        <MenuItem
          onClick={async () => {
            handleClose();
            await logout();
            router.refresh();
          }}
        >
          Вийти
        </MenuItem>
      </Menu>
    </>
  );
}
