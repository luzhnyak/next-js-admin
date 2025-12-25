"use client";

import { useState, useCallback } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { PostImageDTO } from "@/types/DTO/postImageDTO";
import { Popconfirm } from "@/components/ui/Popconfirm";

import { useUploadImageMutation } from "@/tanstack/mutations/posts/uploadImage";
import { useDeleteImageMutation } from "@/tanstack/mutations/posts/deleteImage";
import { useSetAsMainImageMutation } from "@/tanstack/mutations/posts/setAsMainImage";

export default function PostImagesManager({
  postId,
  initialImages,
}: {
  postId: number;
  initialImages: PostImageDTO[];
}) {
  const [images, setImages] = useState<PostImageDTO[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const uploadImage = useUploadImageMutation();
  const deleteImage = useDeleteImageMutation();
  const setAsMain = useSetAsMainImageMutation();

  // --- UPLOAD (used by button & drag&drop)
  const uploadImageHandler = useCallback(
    async (files: FileList) => {
      const file = files[0];
      if (!file) return;

      setLoading(true);

      const res = await uploadImage.mutateAsync({ postId, file });

      setImages((prev) => [...prev, res]);

      setLoading(false);
    },
    [postId, uploadImage]
  );

  // --- Button upload
  const handleButtonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadImageHandler(e.target.files);
  };

  // --- Drag & Drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);

      if (e.dataTransfer.files?.length) {
        uploadImageHandler(e.dataTransfer.files);
      }
    },
    [uploadImageHandler]
  );

  // --- Delete
  const deleteImageHandler = async (imageId: number) => {
    await deleteImage.mutateAsync({ postId, imageId });
    setImages((p) => p.filter((img) => img.id !== imageId));
  };

  // --- Set main
  const setAsMainHandler = async (imageId: number) => {
    await setAsMain.mutateAsync({ postId, imageId });

    setImages((p) =>
      p.map((img) => ({
        ...img,
        isMain: img.id === imageId,
      }))
    );
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        Управління зображеннями поста
      </Typography>
      {/* Drag-and-drop зона */}

      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed",
          borderColor: dragActive ? "primary.main" : "grey.500",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          mb: 3,
          transition: "0.2s",
          backgroundColor: dragActive ? "action.hover" : "transparent",
          cursor: "pointer",
        }}
      >
        <Typography variant="body1" mb={2}>
          Перетягніть зображення сюди або виберіть файл
        </Typography>

        <Button variant="contained" component="label" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Обрати файл"}
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleButtonUpload}
          />
        </Button>
      </Box>

      {/* Grid зі зображеннями */}
      <Grid container spacing={2}>
        {images.map((img) => (
          <Grid key={img.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <Card>
              <CardMedia
                component="img"
                height="160"
                image={img.imageUrl}
                alt=""
                sx={{ objectFit: "cover" }}
              />
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Popconfirm
                  title="Delete Image"
                  description="Видалити зображення?"
                  onConfirm={() => deleteImageHandler(img.id)}
                >
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Popconfirm>
                <IconButton
                  color={img.isMain ? "warning" : "default"}
                  onClick={() => setAsMainHandler(img.id)}
                >
                  {img.isMain ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
