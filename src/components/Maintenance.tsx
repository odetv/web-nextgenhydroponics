import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Image } from "@nextui-org/react";
import MaintenanceImage from "../assets/images/components/maintenance.png";

export default function Maintenance() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-3">
      <Image
        width={480}
        alt="Next-Gen Hydroponics is under construction"
        src={MaintenanceImage.src}
      />
      <Typography>Website is under construction!</Typography>
    </main>
  );
}
