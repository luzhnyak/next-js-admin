import React from "react";
import MainMenu from "@/components/MainMenu";

import { Footer } from "@/components/Footer";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { ToastContainer } from "react-toastify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - AdminPanel",
    default: "AdminPanel - Admin Panel for Next.js",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainMenu />
      <Container maxWidth="xl" sx={{ display: "flex", gap: 3, mt: 3 }}>
        <Box sx={{ flex: 1 }}>{children}</Box>
      </Container>
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}
