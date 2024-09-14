import { Typography, Box, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        padding: "1rem",
        bgcolor: "#f1f1f1",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Designed and Copyright © {new Date().getFullYear()}{" "}
        <Link href="https://www.linkedin.com/in/mohammadreza-kalantari/">
          Mohammadreza Kalantari
        </Link>
        . All rights reserved.
      </Typography>
    </Box>
  );
}
