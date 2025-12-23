export async function getAllCategoriesApi() {
  const res = await fetch(`/api/categories/all`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoriesApi(params?: {
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();

  if (params?.page !== undefined) query.set("page", String(params.page));
  if (params?.limit !== undefined) query.set("limit", String(params.limit));

  const res = await fetch(`/api/categories?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryByIdApi(id: number) {
  const res = await fetch(`/api/categories/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCategoryApi(data: any) {
  const res = await fetch("/api/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCategoryApi({ id, ...data }: any) {
  const res = await fetch(`/api/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategoryApi(id: number) {
  const res = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}
