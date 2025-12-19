"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryApi } from "@/services/categoriesApi";

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
