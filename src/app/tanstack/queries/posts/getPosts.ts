"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostsApi } from "@/services/postsApi";
import { ApiListResponse, IPost } from "@/types";

export const useGetPostsQuery = (params?: {
  page?: number;
  limit?: number;
  category?: string;
}) => {
  return useQuery<ApiListResponse<IPost>>({
    queryKey: ["posts", params],
    queryFn: () => getPostsApi(params),
  });
};
