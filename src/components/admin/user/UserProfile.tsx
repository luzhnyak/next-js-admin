"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import { Modal } from "../../ui/Modal/Modal";
import { UserEditForm } from "@/components/admin/user";
import { useCurrentUserQuery } from "@/tanstack/queries/auth/useCurrentUserQuery";

export const UserProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const { data: currentUser } = useCurrentUserQuery();

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Box>
      <Typography component="h1" variant="h4" gutterBottom>
        {currentUser.displayName}
      </Typography>
      <Card sx={{ maxWidth: 400, mx: "auto", p: 2, textAlign: "center" }}>
        <Avatar
          sx={{ width: 100, height: 100, mx: "auto" }}
          alt={currentUser.displayName}
          src={currentUser.avatarUrl}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {currentUser.email}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Box>
        <Modal isOpenModal={isEditModalOpen} setOpenModal={setIsEditModalOpen}>
          <UserEditForm
            userId={currentUser.id!}
            initialData={currentUser}
            setIsOpenModal={setIsEditModalOpen}
          />
        </Modal>
      </Box>
    </Box>
  );
};
