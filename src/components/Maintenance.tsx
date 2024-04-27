import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Image } from "@nextui-org/react";
import Maintenance from "../assets/image/components/maintenance.png";

export default function CircularIndeterminate() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-3">
      <Image
        width={480}
        alt="Next-Gen Hydroponics is under construction"
        src={Maintenance.src}
      />
      <Typography>Website is under construction!</Typography>
    </main>
  );
}
