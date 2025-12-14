"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "@/services/categoriesApi";
import { ApiListResponse, ICategory } from "@/types";

export const useGetCategoriesQuery = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery<ApiListResponse<ICategory>>({
    queryKey: ["categories", params],
    queryFn: () => getCategoriesApi(params),
  });
};
