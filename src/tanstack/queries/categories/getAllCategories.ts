"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesApi } from "@/services/categoriesApi";
import { ApiListResponse, CategoryDTO } from "@/types";

export const useGetAllCategoriesQuery = () => {
  return useQuery<ApiListResponse<CategoryDTO>>({
    queryKey: ["categories", "all"],
    queryFn: () => getAllCategoriesApi(),
    staleTime: 1000 * 60 * 30,
  });
};
