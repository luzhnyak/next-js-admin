"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommentApi } from "@/services/commentsApi";

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
