"use client";

import { useUploadImageMutation } from "@/tanstack/mutations/posts/uploadImage";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

type ImageUploadProps = {
  postId: number;
};

export const ImageUpload = ({ postId }: ImageUploadProps) => {
  const [url, setUrl] = useState("");

  const uploadImage = useUploadImageMutation();

  async function uploadImageHandler(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) return;

    const res = await uploadImage.mutateAsync({ postId, file });

    setUrl(res.imageUrl);
  }

  return (
    <>
      <input type="file" accept="image/*" onChange={uploadImageHandler} />
      {url && <Image src={url || ""} alt="preview" width="200" height="150" />}
    </>
  );
};
