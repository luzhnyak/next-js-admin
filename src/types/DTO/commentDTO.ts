import { UserDTO } from "./userDTO";

export interface CommentDTO {
  id: number;
  author?: string | null;
  authorEmail?: string | null;
  createdAt: string;
  content: string;
  parent: number;
  postId: number;
  userId: number;
  // post: { id: number; title: string; slug: string };
  user: UserDTO | null;
}
