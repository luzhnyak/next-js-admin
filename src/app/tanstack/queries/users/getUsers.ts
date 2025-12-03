"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "@/services/usersApi";
import { ApiListResponse, IUser } from "@/types";

export const useGetUsersQuery = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery<ApiListResponse<IUser>>({
    queryKey: ["users", params],
    queryFn: () => getUsersApi(params),
  });
};
