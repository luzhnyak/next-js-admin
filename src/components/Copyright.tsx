import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
      }}
    >
      {"Copyright ©. Next.js Admin Template. "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
