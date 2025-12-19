"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi } from "@/services/commentsApi";

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
