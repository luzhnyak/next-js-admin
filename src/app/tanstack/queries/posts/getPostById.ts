"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostByIdApi } from "@/services/postsApi";

export const useGetPostByIdQuery = (id?: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostByIdApi(id!),
    enabled: Boolean(id),
  });
};
