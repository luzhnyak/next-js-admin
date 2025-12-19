"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoryApi } from "@/services/categoriesApi";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
