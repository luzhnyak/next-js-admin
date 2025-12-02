"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Typography, Box } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";

import { ColorBtn, IUser, Routes } from "@/types";
import { useGetUsersQuery } from "@/tanstack/queries/users";

import { useUpdateSearchParams } from "@/hooks/updateSearchParams";
import { Column, CustomTable } from "@/components/ui/CustomTable";
import { CustomTablePagination } from "@/components/ui/CustomTablePagination";
import { Action } from "@/components/ui/TableActionsBtn";
import { Modal } from "../../ui/Modal/Modal";
import { useState } from "react";
import { UserEditForm } from "./UserEditForm";
import { useDeleteUserMutation } from "@/tanstack/mutations/users";

export const UserList = () => {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data, isLoading } = useGetUsersQuery({
    page,
    limit: rowsPerPage,
  });

  const users = data?.items ?? [];
  const total = data?.total ?? 0;

  const deleteUser = useDeleteUserMutation();

  const router = useRouter();

  const columns: Column<IUser>[] = [
    { id: "id", label: "ID" },
    { id: "displayName", label: "Name" },
    { id: "email", label: "Email" },
  ];

  const actions: Action<IUser>[] = [
    {
      key: "viewUserBtn",
      icon: <Visibility />,
      color: ColorBtn.PRIMARY,
      onClick: (user) => router.push(`${Routes.USERS}/${user.id}`),
    },
    {
      key: "editCategoryBtn",
      icon: <Edit />,
      color: ColorBtn.PRIMARY,
      onClick: (category) => {
        setUserId(category.id);
        setIsCreateModalOpen(true);
      },
    },
    {
      key: "deleteCategoryBtn",
      icon: <Delete />,
      color: ColorBtn.ERROR,
      onClick: (category) => {
        deleteUser.mutate(category.id);
      },
      confirm: {
        title: "Delete User",
        description: "Are you sure you want to delete this user?",
      },
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <CustomTable
        columns={columns}
        items={data?.items || []}
        actions={actions}
      />
      <CustomTablePagination
        total={total || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(newPage) => updateSearchParams({ page: newPage })}
        onRowsPerPageChange={(newRows) =>
          updateSearchParams({ rowsPerPage: newRows, page: 1 })
        }
      />
      <Modal
        isOpenModal={isCreateModalOpen}
        setOpenModal={setIsCreateModalOpen}
      >
        {Boolean(userId) ? (
          <UserEditForm
            userId={userId}
            initialData={users.find((u) => u.id === userId)}
            setIsOpenModal={setIsCreateModalOpen}
          />
        ) : (
          <UserEditForm setIsOpenModal={setIsCreateModalOpen} />
        )}
      </Modal>
    </Box>
  );
};
