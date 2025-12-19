"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserApi } from "@/services/usersApi";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
