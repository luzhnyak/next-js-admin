"use client";

import { useQuery } from "@tanstack/react-query";
import { getCommentsApi } from "@/services/commentsApi";
import { ApiListResponse } from "@/types";
import { CommentDTO } from "@/types/DTO/commentDTO";

export const useGetCommentsQuery = (params?: {
  page?: number;
  limit?: number;
  postId?: number;
}) => {
  return useQuery<ApiListResponse<CommentDTO>>({
    queryKey: ["comments", params],
    queryFn: () => getCommentsApi(params),
  });
};
