"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostApi } from "@/services/postsApi";

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
