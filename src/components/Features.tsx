import HeroImage from "../assets/images/components/hero.jpg";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";

export default function Hero() {
  return (
    <div>
      <div className="pt-16 p-4 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1 justify-center items-center max-w-screen-xl">
        <div className="flex flex-col gap-4">
          <Card isFooterBlurred radius="lg" className="border-none">
            <div className="relative overflow-hidden rounded-inherit rounded-large">
              <Image
                className="transform hover:scale-110 transition-transform-opacity object-cover"
                alt="Next-Gen Hydroponics"
                src={HeroImage.src}
              />
            </div>
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80 p-2 text-center">
                Tim Smart Green Garden
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="p-4 flex flex-col gap-2 justify-center items-center max-w-screen-xl">
          <div>
            <p className="font-bold text-center text-emerald-600">
              Produk Unggulan
            </p>
          </div>
          <div>
            <p className="font-bold text-3xl text-center">
              Pertanian Canggih Tanpa Batas
            </p>
          </div>
          <div>
            <p className="text-center text-sm sm:text-base md:text-base lg:text-base xl:text-base">
              Bertani Tanpa Takut Kotor dengan Next-Gen Hydroponics
            </p>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-6">
            <p>[List Keunggulan/Fitur]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
