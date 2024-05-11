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

export default function Collaboration() {
  return (
    <div className="p-4 flex flex-col gap-2 justify-center items-center max-w-screen-xl">
      <div>
        <p className="font-bold text-center text-emerald-600">Kolaborasi</p>
      </div>
      <div>
        <p className="font-bold text-3xl text-center">
          Kerjasama dengan Industri
        </p>
      </div>
      <div>
        <p className="text-center text-sm sm:text-base md:text-base lg:text-base xl:text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="mt-2 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-6">
        <div className="flex flex-row justify-center items-center gap-6">
          <Popover placement="bottom" offset={10} showArrow>
            <PopoverTrigger>
              <div>
                <Image
                  width={80}
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="Undiksha"
                  src={LogoUndiksha.src}
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
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="PT. Dago Engineering"
                  src={LogoDagoEngineering.src}
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
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="Clean & Green Power"
                  src={LogoCGPDagoEng.src}
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
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="Delectra"
                  src={LogoDelectra.src}
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
