import { Typography } from "@mui/material";

export default function AlertAuthorizedAdmin() {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen mx-auto -mt-16 p-4">
      <Typography>Maaf, hanya Admin yang dapat masuk!</Typography>
    </div>
  );
}