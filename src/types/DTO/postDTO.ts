import { CategoryDTO } from "./categoryDTO";
import { PostImageDTO } from "./postImageDTO";

export interface PostDTO {
  id: number;
  title: string;
  slug: string;
  content: string;
  answer: string | null;
  createdAt: Date;
  categories: CategoryDTO[];
  images: PostImageDTO[];
  mainImage: string;
  showMainImage: boolean;
  description: string;
}
