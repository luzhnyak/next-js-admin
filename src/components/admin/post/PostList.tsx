"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, CustomTable } from "../../ui/CustomTable";
import { Typography, Box, Button } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import { ColorBtn } from "@/types";

import { useUpdateSearchParams } from "@/hooks/updateSearchParams";
import { CustomTablePagination } from "@/components/ui/CustomTablePagination";
import { Modal } from "@/components/ui/Modal/Modal";
import { Action } from "@/components/ui/TableActionsBtn";
import { useGetPostsQuery } from "@/tanstack/queries/posts";
import { useDeletePostMutation } from "@/tanstack/mutations/posts";
import { PostEditForm } from "./PostEditForm";
import PostImagesManager from "./PostImagesManager";
import { PostDTO } from "@/types/DTO/postDTO";

export const PostList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isImageManagerModalOpen, setIsImageManagerModalOpen] =
    useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);

  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data } = useGetPostsQuery({
    page: page,
    limit: rowsPerPage,
  });

  const posts = data?.items ?? [];
  const total = data?.total ?? 0;

  const deletePost = useDeletePostMutation();

  const columns: Column<PostDTO>[] = [
    { id: "id", label: "ID" },
    { id: "title", label: "Title" },
    { id: "slug", label: "Slug" },
  ];

  const actions: Action<PostDTO>[] = [
    {
      key: "editPostBtn",
      icon: <Edit />,
      color: ColorBtn.PRIMARY,
      onClick: (post) => {
        setPostId(post.id);
        setIsCreateModalOpen(true);
      },
    },
    {
      key: "imageManagerPostBtn",
      icon: <ImageIcon />,
      color: ColorBtn.PRIMARY,
      onClick: (post) => {
        setPostId(post.id);
        setIsImageManagerModalOpen(true);
      },
    },
    {
      key: "deletePostBtn",
      icon: <Delete />,
      color: ColorBtn.ERROR,
      onClick: (post) => {
        deletePost.mutate(post.id);
      },
      confirm: {
        title: "Delete Post",
        description: "Are you sure you want to delete this post?",
      },
    },
  ];

  const handleCreate = () => {
    setPostId(0);
    setIsCreateModalOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Задачки
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleCreate}
      >
        Create Post
      </Button>
      <CustomTable columns={columns} items={posts || []} actions={actions} />
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
        {Boolean(postId) ? (
          <PostEditForm
            postId={postId}
            initialData={posts.find((c) => c.id === postId)}
            setIsOpenModal={setIsCreateModalOpen}
          />
        ) : (
          <PostEditForm setIsOpenModal={setIsCreateModalOpen} />
        )}
      </Modal>
      <Modal
        isOpenModal={isImageManagerModalOpen}
        setOpenModal={setIsImageManagerModalOpen}
      >
        <PostImagesManager
          postId={postId}
          initialImages={posts.find((c) => c.id === postId)?.images || []}
        />
      </Modal>
    </Box>
  );
};
