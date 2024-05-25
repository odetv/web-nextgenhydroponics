import { Typography } from "@mui/material";

export default function AlertAuthorizedMember() {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen mx-auto p-4">
      <Typography>
        Maaf, hanya Member yang dapat masuk! Silahkan hubungi Admin untuk
        informasi lebih lanjut.
      </Typography>
    </div>
  );
}
