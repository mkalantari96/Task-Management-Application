import { Card, CardContent, Grid2, Grow, Typography } from "@mui/material";

export default function NoTaskSelected() {
  return (
    <Grow in={true}>
      <Card sx={{ mx: "auto", px: 1, bgcolor: "#fff8f8" }}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <Typography
                sx={{
                  color: "#333333",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: { xs: "0.6rem", sm: "1rem" },
                  px: 1,
                }}
              >
                No task selected! Please select one from the list 🔎
              </Typography>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Grow>
  );
}
