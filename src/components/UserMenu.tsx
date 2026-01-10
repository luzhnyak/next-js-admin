"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, IconButton, Tooltip, Menu, MenuItem } from "@mui/material";

import { getGravatarUrl } from "@/lib/gravatar";
import { useCurrentUserQuery } from "@/tanstack/queries/auth/useCurrentUserQuery";
import { useLogoutMutation } from "@/tanstack/mutations/auth/useLogoutMutation";

export default function UserMenu() {
  const router = useRouter();

  const { data: currentUser } = useCurrentUserQuery();
  const logout = useLogoutMutation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (!currentUser) {
    return (
      <MenuItem onClick={() => router.push("/auth/login")}>Логін</MenuItem>
    );
  }

  const avatarUrl = getGravatarUrl(currentUser.email, 80);

  return (
    <>
      <Tooltip title="Профіль">
        <IconButton onClick={handleClick}>
          <Avatar src={avatarUrl} alt={currentUser.displayName} />
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

        {currentUser.role === "admin" && (
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
            await logout.mutateAsync();
            router.refresh();
          }}
        >
          Вийти
        </MenuItem>
      </Menu>
    </>
  );
}
