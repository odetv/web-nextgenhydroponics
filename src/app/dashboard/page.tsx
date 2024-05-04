"use client";
import * as React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "@/middleware/AuthenticationProviders";

export default function Dashboard() {
  const user = useAuth();

  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-3">
      {user ? (
        <Typography>Selamat datang di Dashboard.</Typography>
      ) : (
        <Typography>
          Anda tidak memiliki akses. Silahkan masuk terlebih dahulu!
        </Typography>
      )}
    </main>
  );
}
