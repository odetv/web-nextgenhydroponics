import { Skeleton, Stack } from "@mui/material";

export default function Team() {
  return (
    <div className="pt-16 p-4 flex flex-col gap-2 justify-center items-center max-w-screen-xl">
      <div>
        <p className="font-bold text-center text-emerald-600">Tim Kerja</p>
      </div>
      <div>
        <p className="font-bold text-3xl text-center">Next-Gen Hydroponics</p>
      </div>
      <div>
        <p className="text-center text-sm sm:text-base md:text-base lg:text-base xl:text-base">
          Kenali Kami dan Mulailah Perjalananmu Bersama Kami
        </p>
      </div>
      <div className="mt-2 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-6">
        <Stack spacing={1} direction="row">
          <Skeleton variant="circular" width={64} height={64} />
          <Skeleton variant="circular" width={64} height={64} />
          <Skeleton variant="circular" width={64} height={64} />
        </Stack>
      </div>
    </div>
  );
}
