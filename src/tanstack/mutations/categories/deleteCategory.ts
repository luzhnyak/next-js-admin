"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryApi } from "@/services/categoriesApi";

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
