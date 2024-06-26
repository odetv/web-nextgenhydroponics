import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import LogoUndiksha from "@/assets/images/logo/LogoUndiksha.png";
import LogoDagoEngineering from "@/assets/images/logo/LogoDagoEng.png";
import LogoCGPDagoEng from "@/assets/images/logo/LogoCGPDagoEng.png";
import LogoDelectra from "@/assets/images/logo/LogoDelectra.png";

export default function Collaboration() {
  return (
    <div
      id="overview"
      className="pt-16 p-4 flex flex-col gap-2 justify-center items-center max-w-screen-xl"
    >
      <div>
        <p className="font-bold text-center text-emerald-600">Kolaborasi</p>
      </div>
      <div>
        <p className="font-bold text-3xl text-center">
          Kerjasama dengan Industri
        </p>
      </div>
      <div>
        <p className="text-center text-sm sm:text-base">
          Fakultas Teknik dan Kejuruan Universitas Pendidikan Ganesha melakukan
          kerja sama kolaborasi bersama dengan PT. Dago Engineering, Bandung.
          Sebagai bentuk penggunaan teknologi, MBKM ini mengusung tema Smart
          Green Garden yang berfokus pada sektor pertanian hidroponik dan sektor
          teknologi canggih yaitu Internet of Things (IoT), Artificial
          Intelligence (AI), dan pemanfaatan Energi Terbarukan dari sinar
          matahari menggunakan panel surya.
        </p>
      </div>
      <div className="mt-2 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-6">
        <div className="flex flex-row justify-center items-center gap-6">
          <Popover placement="bottom" offset={10} showArrow>
            <PopoverTrigger>
              <div>
                <Image
                  width={80}
                  height={80}
                  style={{ height: "auto", width: 72 }}
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="Undiksha"
                  src={LogoUndiksha.src}
                  priority={true}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 text-center">
                <div className="text-small font-bold">Undiksha</div>
                <div className="text-tiny">Fakultas Teknik dan Kejuruan</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="mt-1"
                >
                  <a target="_blank" href="https://undiksha.ac.id/">
                    Kunjungi
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover placement="bottom" offset={10} showArrow>
            <PopoverTrigger>
              <div>
                <Image
                  width={172}
                  height={172}
                  style={{ height: "auto", width: 172 }}
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="PT. Dago Engineering"
                  src={LogoDagoEngineering.src}
                  priority={true}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 text-center">
                <div className="text-small font-bold">PT. Dago Engineering</div>
                <div className="text-tiny">Bandung</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="mt-1"
                >
                  <a target="_blank" href="https://dagoeng.co.id/">
                    Kunjungi
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-row justify-center items-center gap-6">
          <Popover placement="bottom" offset={10} showArrow>
            <PopoverTrigger>
              <div>
                <Image
                  width={162}
                  height={162}
                  style={{ height: "auto", width: 162 }}
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="Clean & Green Power"
                  src={LogoCGPDagoEng.src}
                  priority={true}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 text-center">
                <div className="text-small font-bold">Clean & Green Power</div>
                <div className="text-tiny">Bandung</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="mt-1"
                >
                  <a target="_blank" href="https://dagoeng.co.id/">
                    Kunjungi
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover placement="bottom" offset={10} showArrow>
            <PopoverTrigger>
              <div>
                <Image
                  width={238}
                  height={238}
                  style={{ height: "auto", width: 238 }}
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="Delectra"
                  src={LogoDelectra.src}
                  priority={true}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 text-center">
                <div className="text-small font-bold">Delectra</div>
                <div className="text-tiny">Bandung</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="mt-1"
                >
                  <a target="_blank" href="https://delectra.id/">
                    Kunjungi
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
