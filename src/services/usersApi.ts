export async function getUsersApi(params?: { page?: number; limit?: number }) {
  const query = new URLSearchParams();

  if (params?.page !== undefined) query.set("page", String(params.page));
  if (params?.limit !== undefined) query.set("limit", String(params.limit));

  const res = await fetch(`/api/users?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getUserByIdApi(id: number) {
  const res = await fetch(`/api/users/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUserApi(data: any) {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUserApi({ id, ...data }: any) {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function deleteUserApi(id: number) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}
