import HeroImage from "../assets/images/components/hero.jpg";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";

export default function Hero() {
  return (
    <div>
      <div className="mt-4 p-4 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1 justify-center items-center max-w-screen-xl">
        <div className="flex flex-col gap-4">
          <p className="font-bold leading-tight text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl">
            Ciptakan Teknologi Pertanian Bersama{" "}
            <span className="text-emerald-600">Next-Gen Hydroponics</span>
          </p>
          <p>
            Integrating AI and IoT with Renewable Energy for Plants Going
            Forward. Langkah maju dalam meningkatkan produktivitas pertanian
            serta menjaga keberlanjutan lingkungan dengan Teknologi Internet of
            Things dan Artificial Intelligence.
          </p>
          <div className="flex flex-row gap-2">
            <Button
              radius="sm"
              color="primary"
              variant="flat"
              className="font-semibold text-emerald-600"
            >
              <a href="/dashboard">Mulai Jelajahi</a>
            </Button>
            <Button
              radius="sm"
              color="success"
              className="font-semibold text-blue-500"
              variant="light"
            >
              <a href="/#overview">Overview</a>
            </Button>
          </div>
        </div>
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
    </div>
  );
}
