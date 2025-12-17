"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <Box sx={{ mt: 4, py: 3, textAlign: "center", opacity: 0.7 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body2">
        © {new Date().getFullYear()} Next Admin. Усі права захищені.
      </Typography>
    </Box>
  );
};
