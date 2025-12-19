"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "@/services/postsApi";

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
