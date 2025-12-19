import { registerApi } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
};
