"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Column, CustomTable } from "../../ui/CustomTable";
import { Typography, Box, Button } from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";

import { ColorBtn, ICategory, Routes } from "@/types";

import { useUpdateSearchParams } from "@/hooks/updateSearchParams";
import { CustomTablePagination } from "@/components/ui/CustomTablePagination";
import { Modal } from "@/components/ui/Modal/Modal";
import { Action } from "@/components/ui/TableActionsBtn";
import { CategoryEditForm } from "./CategoryEditForm";
import { useGetCategoriesQuery } from "@/tanstack/queries/categories";
import { useDeleteCategoryMutation } from "@/tanstack/mutations/categories";

export const CategoryList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);

  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data, isLoading } = useGetCategoriesQuery({
    page,
    limit: rowsPerPage,
  });

  const categories = data?.items ?? [];
  const total = data?.total ?? 0;

  // 🔥 Мутація видалення
  const deleteCategory = useDeleteCategoryMutation();

  const router = useRouter();

  const columns: Column<ICategory>[] = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "slug", label: "Slug" },
  ];

  const actions: Action<ICategory>[] = [
    {
      key: "editCategoryBtn",
      icon: <Edit />,
      color: ColorBtn.PRIMARY,
      onClick: (category) => {
        setCategoryId(category.id);
        setIsCreateModalOpen(true);
      },
    },
    {
      key: "deleteCategoryBtn",
      icon: <Delete />,
      color: ColorBtn.ERROR,
      onClick: (category) => {
        deleteCategory.mutate(category.id);
      },
      confirm: {
        title: "Підтвердження видалення",
        description: "Ви впевнені, що хочете видалити цю категорію?",
      },
    },
  ];

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Управління категоріями
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleCreate}
      >
        Створити категорію
      </Button>
      <CustomTable
        columns={columns}
        items={categories || []}
        actions={actions}
      />
      <CustomTablePagination
        total={total}
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
        {Boolean(categoryId) ? (
          <CategoryEditForm
            categoryId={categoryId}
            initialData={categories.find((c) => c.id === categoryId)}
            setIsOpenModal={setIsCreateModalOpen}
          />
        ) : (
          <CategoryEditForm setIsOpenModal={setIsCreateModalOpen} />
        )}
      </Modal>
    </Box>
  );
};
