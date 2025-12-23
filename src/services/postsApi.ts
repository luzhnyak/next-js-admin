import { PostImageDTO } from "@/types/DTO/postImageDTO";

export async function getPostsApi(params?: {
  page?: number;
  limit?: number;
  category?: string;
}) {
  const query = new URLSearchParams();

  if (params?.page !== undefined) query.set("page", String(params.page));
  if (params?.limit !== undefined) query.set("limit", String(params.limit));
  if (params?.category) query.set("category", params.category);

  const res = await fetch(`/api/posts?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getPostByIdApi(id: number) {
  const res = await fetch(`/api/posts/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPostApi(data: any) {
  const res = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updatePostApi({ id, ...data }: any) {
  const res = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

export async function deletePostApi(id: number) {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}

export async function uploadImageApi({
  postId,
  file,
}: {
  postId: number;
  file: File;
}): Promise<PostImageDTO> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`/api/posts/${postId}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload image");
  }

  return res.json();
}

export const deleteImageApi = async ({
  postId,
  imageId,
}: {
  postId: number;
  imageId: number;
}): Promise<void> => {
  const res = await fetch(`/api/posts/${postId}/images/${imageId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete image");
  }
};

export const setAsMainImageApi = async ({
  postId,
  imageId,
}: {
  postId: number;
  imageId: number;
}): Promise<void> => {
  const res = await fetch(`/api/posts/${postId}/images/set-main`, {
    method: "PATCH",
    body: JSON.stringify({ imageId }),
  });

  if (!res.ok) {
    throw new Error("Failed to set image as main");
  }
};
