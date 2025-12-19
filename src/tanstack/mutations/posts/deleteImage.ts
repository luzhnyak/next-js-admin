"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImageApi } from "@/services/postsApi";

export const useDeleteImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
