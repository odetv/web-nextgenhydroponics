import Link from "next/link";
import HeroImage1 from "../assets/images/components/hero/hero1.jpg";
import HeroImage2 from "../assets/images/components/hero/hero2.jpg";
import HeroImage3 from "../assets/images/components/hero/hero3.jpg";
import HeroImage4 from "../assets/images/components/hero/hero4.jpg";
import HeroImage5 from "../assets/images/components/hero/hero5.jpg";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { useRef } from "react";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden tracking-tight leading-normal m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block mr-1">{children} </span>
        <span className="block mr-1">{children} </span>
        <span className="block mr-1">{children} </span>
        <span className="block mr-1">{children} </span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <div>
      <div className="p-4 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1 justify-center items-center max-w-screen-xl">
        <div className="flex flex-col">
          <p className="font-bold leading-tight text-3xl sm:text-5xl pb-2">
            Pertanian{" "}
            <TypeAnimation
              sequence={["Canggih", 2000, "Cerdas", 2000, "Keren", 2000]}
              wrapper="span"
              speed={40}
              cursor={true}
              repeat={Infinity}
              className="bg-blue-200 rounded-lg"
            />
          </p>
          <p className="text-emerald-600 font-bold leading-tight text-3xl sm:text-5xl pb-4">
            Next-Gen Hydroponics
          </p>
          <p className="text-sm sm:text-base pb-4">
            Langkah maju dalam meningkatkan produktivitas pertanian serta
            menjaga keberlanjutan lingkungan dengan Teknologi Internet of Things
            dan Artificial Intelligence.
          </p>
          <div className="flex flex-row gap-2">
            <Button
              radius="sm"
              color="primary"
              variant="flat"
              className="font-semibold text-emerald-600"
            >
              <Link href="/dashboard">Mulai Jelajahi</Link>
            </Button>
            <Button
              radius="sm"
              color="success"
              className="font-semibold text-blue-500"
              variant="light"
            >
              <Link href="/#overview">Overview</Link>
            </Button>
          </div>
        </div>
        <Card isFooterBlurred radius="lg" className="border-none">
          <div className="relative overflow-hidden rounded-inherit rounded-large">
            <Carousel
              autoPlay
              interval={3000}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              showIndicators={true}
              showArrows={true}
              swipeable={true}
            >
              <Image
                className="transform hover:scale-110 transition-transform-opacity object-cover w-full h-full"
                alt="Hero Next-Gen Hydroponics 1"
                src={HeroImage1.src}
                width={800}
                height={400}
                priority={true}
              />
              <Image
                className="transform hover:scale-110 transition-transform-opacity object-cover w-full h-full"
                alt="Hero Next-Gen Hydroponics 2"
                src={HeroImage2.src}
                width={800}
                height={400}
                priority={true}
              />
              <Image
                className="transform hover:scale-110 transition-transform-opacity object-cover w-full h-full"
                alt="Hero Next-Gen Hydroponics 3"
                src={HeroImage3.src}
                width={800}
                height={400}
                priority={true}
              />
              <Image
                className="transform hover:scale-110 transition-transform-opacity object-cover w-full h-full"
                alt="Hero Next-Gen Hydroponics 4"
                src={HeroImage4.src}
                width={800}
                height={400}
                priority={true}
              />
              <Image
                className="transform hover:scale-110 transition-transform-opacity object-cover w-full h-full"
                alt="Hero Next-Gen Hydroponics 5"
                src={HeroImage5.src}
                width={800}
                height={400}
                priority={true}
              />
            </Carousel>
          </div>
          <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <div className="text-tiny text-white/80 p-2 text-center">
              <ParallaxText baseVelocity={-1}>
                Tim Smart Green Garden Pertanian Canggih Cerdas Keren Internet
                of Things Artificial Intelligence Energi Terbarukan Panel Surya
                - Kerjasama Fakultas Teknik dan Kejuruan Undiksha dengan PT.
                Dago Engineering |
              </ParallaxText>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
