"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "@/services/usersApi";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
