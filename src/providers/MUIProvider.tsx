"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import MuiEmotionCacheProvider from "./MuiEmotionCacheProvider";

const theme = createTheme();

export default function MUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MuiEmotionCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MuiEmotionCacheProvider>
  );
}
