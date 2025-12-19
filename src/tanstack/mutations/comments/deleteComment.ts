"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentApi } from "@/services/commentsApi";

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
