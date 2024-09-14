import { Grid2, Typography } from "@mui/material";
import LogoIcon from "../assets/logo.png";
export default function LogoAndTitle() {
  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        py: "2rem",
        px: "1rem",
        bgcolor: "#FFBE0B",
        height: "100%",
        mx: "auto",
        color: "grey.800",
        borderTop: "1px solid",
        borderRight: "1px solid",
        borderColor: "grey.300",
      }}
    >
      <Grid2 container alignItems="center" justifyContent="center" size={3}>
        <img
          src={LogoIcon}
          alt="a list of items to do"
          style={{
            width: "100%",
          }}
        />
      </Grid2>
      <Grid2 container alignItems="center" justifyContent="center" size={9}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.8rem",
            fontWeight: "800",
          }}
        >
          Task Management Tools
        </Typography>
      </Grid2>
    </Grid2>
  );
}
