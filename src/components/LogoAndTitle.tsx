import { Typography, Grid } from "@mui/material";
import LogoIcon from "../assets/logo.png";

export default function LogoAndTitle() {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        py: { xs: "1rem", sm: "2rem" },
        px: { xs: "0.5rem", sm: "1rem" },
        bgcolor: "#FFBE0B",
        height: "auto",
        color: "grey.800",
        borderTop: "1px solid",
        borderColor: "grey.300",
      }}
    >
      <Grid item xs={3}>
        <img
          src={LogoIcon}
          alt="Logo"
          style={{ width: "100%", maxWidth: "100px" }}
        />
      </Grid>
      <Grid item xs={9} container alignItems="center" justifyContent="center">
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { xs: "0.7rem", sm: "0.8rem" },
            fontWeight: "800",
          }}
        >
          Task Management App
        </Typography>
      </Grid>
    </Grid>
  );
}
