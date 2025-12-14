"use client";

import { useQuery } from "@tanstack/react-query";
import { getCommentByIdApi } from "@/services/commentsApi";

export const useGetCommentByIdQuery = (id?: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCommentByIdApi(id!),
    enabled: Boolean(id),
  });
};
