import { CategoryList } from "@/components/admin/category";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminCategoriesPage() {
  return <CategoryList />;
}
