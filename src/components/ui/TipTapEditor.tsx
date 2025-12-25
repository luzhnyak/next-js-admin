"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Img from "next/image";
import Underline from "@tiptap/extension-underline";

import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ImageIcon from "@mui/icons-material/Image";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { apiFetch } from "@/lib/apiFetch";

interface Props {
  value: string;
  postId: number;
  height?: number;
  onChange: (value: string) => void;
  images: string[]; // список вже завантажених картинок з сервера
}

export const TipTapEditor = ({ value, postId, onChange, images }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);

  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: { style: "max-width:100%;height:auto;" },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!mounted || !editor) return null;

  // --- вставка існуючої картинки ---
  const insertImage = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
    setOpenGallery(false);
  };

  // --- завантаження нового зображення ---
  const uploadNewImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await apiFetch(`/api/posts/${postId}/images/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.imageUrl) {
          editor.chain().focus().setImage({ src: data.imageUrl }).run();
        }
      } catch (err) {
        console.error(err);
      }
    };
    input.click();
  };

  return (
    <Box>
      {/* --- Toolbar --- */}
      <Stack direction="row" spacing={1} mb={1}>
        <IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
          <FormatBoldIcon />
        </IconButton>
        <IconButton onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FormatListNumberedIcon />
        </IconButton>

        {/* Кнопка вставки існуючих зображень */}
        <IconButton onClick={() => setOpenGallery(true)}>
          <ImageIcon />
        </IconButton>

        {/* Кнопка завантаження нового зображення */}
        <IconButton onClick={uploadNewImage}>
          <UploadFileIcon />
        </IconButton>
      </Stack>

      {/* --- Editor --- */}
      <Box
        sx={{ border: "1px solid #ddd", borderRadius: 1, p: 2, minHeight: 200 }}
      >
        <EditorContent editor={editor} />
      </Box>

      {/* --- Модалка з галереєю існуючих зображень --- */}
      <Dialog
        open={openGallery}
        onClose={() => setOpenGallery(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Вставити зображення</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {images.map((img) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={img}>
                <Img
                  src={img}
                  onClick={() => insertImage(img)}
                  style={{ width: "100%", cursor: "pointer", borderRadius: 8 }}
                  alt="Зображення"
                  height={150}
                  width={200}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
