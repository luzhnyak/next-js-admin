import React from "react";
import { Footer } from "@/components/Footer";
import TanstackProvider from "@/providers/TanstackProvider";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SidebarNav from "@/components/admin/SidebarNav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Вертикальне меню */}
        <SidebarNav />

        {/* Контент адмінки */}
        <Container
          maxWidth="xl"
          sx={{
            flex: 1,
            py: 4,
          }}
        >
          {children}
        </Container>
      </Box>

      {/* <Footer /> */}
    </TanstackProvider>
  );
}
