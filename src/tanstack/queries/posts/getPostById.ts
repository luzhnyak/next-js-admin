"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostByIdApi } from "@/services/postsApi";
import { PostDTO } from "@/types/DTO/postDTO";

export const useGetPostByIdQuery = (id?: number) => {
  return useQuery<PostDTO>({
    queryKey: ["post", id],
    queryFn: () => getPostByIdApi(id!),
    enabled: Boolean(id),
  });
};
