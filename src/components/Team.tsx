import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import LogoUndiksha from "@/assets/images/logo/LogoUndiksha.png";
import LogoDagoEngineering from "@/assets/images/logo/LogoDagoEng.png";
import LogoCGPDagoEng from "@/assets/images/logo/LogoCGPDagoEng.png";
import LogoDelectra from "@/assets/images/logo/LogoDelectra.png";

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
        <p>[Foto Tim]</p>
      </div>
    </div>
  );
}
