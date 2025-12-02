"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/tanstack/mutations/categories";
import { editCategorySchema } from "@/shemas/editCategorySchema";

// import { useCategorySchema } from "@/schemas/category";

interface CategoryEditFormProps {
  categoryId?: number;
  initialData?: {
    name: string;
    slug: string;
  };
  setIsOpenModal: (isOpen: boolean) => void;
}

export const CategoryEditForm = ({
  categoryId,
  initialData,
  setIsOpenModal,
}: CategoryEditFormProps) => {
  const isEditing = Boolean(categoryId);

  const createCategory = useCreateCategoryMutation();
  const updateCategory = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editCategorySchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (data: { name: string; slug: string }) => {
    if (isEditing) {
      updateCategory.mutate({ id: categoryId!, ...data });
    } else {
      createCategory.mutate(data);
    }
    setIsOpenModal(false);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        {isEditing ? "Edit Category" : "Create Category"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Slug"
            {...register("slug")}
            error={!!errors.slug}
            helperText={errors.slug?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              (createCategory as any).isLoading ||
              (updateCategory as any).isLoading
            }
          >
            {(createCategory as any).isLoading ||
            (updateCategory as any).isLoading
              ? "Saving"
              : "Save"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
