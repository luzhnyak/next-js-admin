"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAsMainImageApi } from "@/services/postsApi";

export const useSetAsMainImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setAsMainImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
