import { Metadata } from "next";
import GalleryInstagram from "../../components/GalleryInstagram";

export const metadata: Metadata = {
  title: "Next-Gen Hydroponics | Blog",
  description:
    "Website Tim Next-Gen Hydroponics Program MBKM Riset Independen Smart Green Garden Dago Engineering FTK Undiksha",
};

export default function Blog() {
  return (
    <div className="flex flex-col justify-center items-center text-center pt-8 pb-8">
      <div className="flex flex-col gap-1 pb-8">
        <h1 className="font-bold text-3xl">Publikasi Kegiatan</h1>
        <p>Ikuti Keseruan Kegiatan Kami</p>
      </div>
      <GalleryInstagram />
    </div>
  );
}
