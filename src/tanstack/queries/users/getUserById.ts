"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryByIdApi } from "@/services/categoriesApi";

export const useGetCategoryByIdQuery = (id?: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryByIdApi(id!),
    enabled: Boolean(id),
  });
};
