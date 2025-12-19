"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageApi } from "@/services/postsApi";

export const useUploadImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
