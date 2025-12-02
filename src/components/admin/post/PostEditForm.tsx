"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/tanstack/mutations/posts";
import { editPostSchema } from "@/shemas/editPostSchema";
import { ICategory, IPost, IPostCreate } from "@/types";
import { useGetAllCategoriesQuery } from "@/tanstack/queries/categories/getAllCategories";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface PostEditFormProps {
  postId?: number;
  initialData?: IPost;
  setIsOpenModal: (isOpen: boolean) => void;
}

export const PostEditForm = ({
  postId,
  initialData,
  setIsOpenModal,
}: PostEditFormProps) => {
  const isEditing = Boolean(postId);

  const categoriesQuery = useGetAllCategoriesQuery();
  const categories = categoriesQuery.data?.items || [];

  const createPost = useCreatePostMutation();
  const updatePost = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IPostCreate>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      slug: initialData?.slug || "",
      answer: initialData?.answer || "",
      categoryIds: initialData?.categories.map((c) => c.id) ?? [],
    },
  });

  const selectedCategories = watch("categoryIds");

  const onSubmit = async (data: IPostCreate) => {
    const payload = {
      ...data,
    };

    if (isEditing) {
      updatePost.mutate({ id: postId!, ...payload });
    } else {
      createPost.mutate(payload);
    }
    setIsOpenModal(false);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        {isEditing ? "Edit Post" : "Create Post"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Content"
            multiline
            rows={8}
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Content
            </Typography>
            <TipTapEditor
              value={watch("content")}
              onChange={(html) => setValue("content", html)}
              height={200}
            />
            {errors.content && (
              <Typography color="error" variant="caption">
                {errors.content.message}
              </Typography>
            )}
          </Box>
          <TextField
            label="Answer"
            multiline
            rows={4}
            {...register("answer")}
            error={!!errors.answer}
            helperText={errors.answer?.message}
          />
          <TextField
            label="Slug"
            {...register("slug")}
            error={!!errors.slug}
            helperText={errors.slug?.message}
          />
          <FormControl fullWidth>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              label="Categories"
              onChange={(e) => {
                setValue(
                  "categoryIds",
                  typeof e.target.value === "string"
                    ? e.target.value.split(",").map(Number)
                    : (e.target.value as number[])
                );
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              (createPost as any).isLoading || (updatePost as any).isLoading
            }
          >
            {(createPost as any).isLoading || (updatePost as any).isLoading
              ? "Saving"
              : "Save"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
