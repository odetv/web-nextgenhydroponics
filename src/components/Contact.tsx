import { Button, Skeleton, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Hero() {
  return (
    <div>
      <div className="pt-16 p-4 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1 justify-center items-center max-w-screen-xl">
        <div className="flex flex-col gap-4">
          <div className="p-4 flex flex-col gap-2 justify-center items-center max-w-screen-xl">
            <div>
              <p className="font-bold text-center text-emerald-600">Kontak</p>
            </div>
            <div>
              <p className="font-bold text-3xl text-center">
                Ada sesuatu? Hubungi Kami
              </p>
            </div>
            <div>
              <p className="text-center text-sm sm:text-base md:text-base lg:text-base xl:text-base">
                Dapatkan Informasi Lebih Lanjut Tentang Project Kami
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2">
              <a
                rel="noopener noreferrer"
                href="https://instagram.com/nextgen.hydroponics"
                target="_blank"
                title="Instagram"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <Button
                  className="lowercase"
                  variant="outlined"
                  color="info"
                  startIcon={<InstagramIcon />}
                >
                  @nextgen.hydroponics
                </Button>
              </a>
              <a
                rel="noopener noreferrer"
                href="mailto:research.nextgenhydroponics@gmail.com"
                target="_blank"
                title="Email"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <Button
                  className="lowercase"
                  variant="outlined"
                  color="info"
                  startIcon={<MailOutlineIcon />}
                >
                  research.nextgenhydroponics@gmail.com
                </Button>
              </a>
            </div>
            <div className="mt-2 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-6">
              <Stack spacing={1}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </div>
          </div>
        </div>
        <iframe
          width="100%"
          height="100%"
          title="map"
          className="rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.6861692693933!2d115.13055157575472!3d-8.133397481429773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd191df23585063%3A0xb4203c0eda012672!2sUndiksha%20Jinengdalem!5e0!3m2!1sid!2sid!4v1715692412864!5m2!1sid!2sid"
        ></iframe>
      </div>
    </div>
  );
}
