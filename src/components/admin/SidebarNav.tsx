"use client";

import { usePathname, useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SidebarNav() {
  const router = useRouter();
  const pathname = usePathname();

  // 🔥 Тимчасово хардкодимо користувача (ти пізніше підставиш реальні дані)
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/images/avatar.png",
  };

  const nav = [
    { label: "Категорії", path: "/admin/categories", icon: <CategoryIcon /> },
    { label: "Пости", path: "/admin/posts", icon: <ArticleIcon /> },
    { label: "Користувачі", path: "/admin/users", icon: <PeopleIcon /> },
  ];

  const handleLogout = () => {
    // 🔥 Логіка виходу (видалити токен, очистити store тощо)
    router.push("/login");
  };

  return (
    <Box
      sx={{
        width: 260,
        borderRight: "1px solid #e0e0e0",
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
      }}
    >
      {/* 🔵 Блок користувача */}
      <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 70, height: 70, mx: "auto", mb: 1 }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {user.name}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {user.email}
        </Typography>

        {/* Вихід */}
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ mt: 2, textTransform: "none" }}
        >
          Вийти
        </Button>
      </Box>

      <Divider />

      {/* 🔵 Основна навігація */}
      <List sx={{ py: 2, flexGrow: 1 }}>
        {nav.map((item) => (
          <ListItemButton
            key={item.path}
            selected={pathname.startsWith(item.path)}
            onClick={() => router.push(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* 🔵 Кнопка на основний сайт */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          component={Link}
          href="/"
          sx={{ textTransform: "none" }}
        >
          На сайт
        </Button>
      </Box>
    </Box>
  );
}
