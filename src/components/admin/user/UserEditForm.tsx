"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";

import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/tanstack/mutations/users";

import { editUserSchema } from "@/shemas/editUserSchema";

interface UserFormData {
  displayName: string;
  email: string;
  password?: string;
}

interface UserEditFormProps {
  userId?: number;
  initialData?: {
    displayName: string;
    email: string;
    password?: string | null;
  };
  setIsOpenModal: (isOpen: boolean) => void;
}

export const UserEditForm = ({
  userId,
  initialData,
  setIsOpenModal,
}: UserEditFormProps) => {
  const isEditing = Boolean(userId);

  const createUser = useCreateUserMutation();
  const updateUser = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      displayName: initialData?.displayName || "",
      email: initialData?.email || "",
      password: "",
    },
  });

  const onSubmit = async (data: {
    displayName: string;
    email?: string;
    password?: string;
  }) => {
    if (isEditing) {
      updateUser.mutate({ id: userId!, ...data });
    } else {
      createUser.mutate(data);
    }
    setIsOpenModal(false);
  };

  // useEffect(() => {
  //   if (error) toast.error(t("user.errorLoadingUser"));
  // }, [error, t, toast]);

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        {isEditing ? "Edit User" : "Create User"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Display Name"
            {...register("displayName")}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
          />
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              (createUser as any).isLoading || (updateUser as any).isLoading
            }
          >
            {(createUser as any).isLoading || (updateUser as any).isLoading
              ? "Saving..."
              : "Save"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
