"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesApi } from "@/services/categoriesApi";
import { ApiListResponse, ICategory } from "@/types";

export const useGetAllCategoriesQuery = () => {
  return useQuery<ApiListResponse<ICategory>>({
    queryKey: ["categories", "all"],
    queryFn: () => getAllCategoriesApi(),
  });
};
