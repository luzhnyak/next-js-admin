export async function getCommentsApi(params?: {
  page?: number;
  limit?: number;
  postId?: number;
}) {
  const query = new URLSearchParams();

  if (params?.page !== undefined) query.set("page", String(params.page));
  if (params?.limit !== undefined) query.set("limit", String(params.limit));
  if (params?.postId !== undefined) query.set("postId", String(params.postId));

  const res = await fetch(`/api/comments?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function getCommentByIdApi(id: number) {
  const res = await fetch(`/api/comments/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch comment");
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCommentApi(data: any) {
  const res = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create comment");
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCommentApi({ id, ...data }: any) {
  const res = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update comment");
  return res.json();
}

export async function deleteCommentApi(id: number) {
  const res = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
}
