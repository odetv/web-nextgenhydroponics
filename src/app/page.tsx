import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function CircularIndeterminate() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-3">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
      <Typography>Website is under construction!</Typography>
    </main>
  );
}
