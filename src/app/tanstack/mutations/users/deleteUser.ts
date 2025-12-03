"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "@/services/usersApi";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
