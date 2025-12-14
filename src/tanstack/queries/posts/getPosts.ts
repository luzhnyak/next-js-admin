"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostsApi } from "@/services/postsApi";
import { ApiListResponse } from "@/types";
import { PostDTO } from "@/types/DTO/postDTO";

export const useGetPostsQuery = (params?: {
  page?: number;
  limit?: number;
  category?: string;
}) => {
  return useQuery<ApiListResponse<PostDTO>>({
    queryKey: ["posts", params],
    queryFn: () => getPostsApi(params),
  });
};
