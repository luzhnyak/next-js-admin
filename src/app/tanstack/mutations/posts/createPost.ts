"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostApi } from "@/services/postsApi";

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
