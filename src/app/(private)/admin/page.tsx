import { notFound } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { categoryService, postService } from "@/di/container";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminPanelPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Адмін панель
      </Typography>
      <Box mt={4}>
        <Typography>Вітаємо в адмін панелі!</Typography>

        <Typography>
          Тут ви можете керувати користувачами, категоріями та постами вашого
          сайту.
        </Typography>
      </Box>
    </Box>
  );
}
