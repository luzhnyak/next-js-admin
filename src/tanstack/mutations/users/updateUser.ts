"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "@/services/usersApi";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // ⬇️ дістаємо current user з кешу
      const me = queryClient.getQueryData<{ id: number }>(["auth", "me"]);

      // ⬇️ тільки якщо редагую сам себе
      if (me?.id === variables.id) {
        queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      }
    },
  });
};
