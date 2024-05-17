import { Image } from "@nextui-org/react";
import PhotoGelgel from "../assets/images/components/teams/gelgel.png";
import PhotoBakti from "../assets/images/components/teams/bakti.png";
import PhotoDiani from "../assets/images/components/teams/diani.png";
import PhotoSeptiadi from "../assets/images/components/teams/septiadi.png";
import PhotoSapta from "../assets/images/components/teams/sapta.png";
import PhotoWaradiana from "../assets/images/components/teams/waradiana.png";
import PhotoMandiasa from "../assets/images/components/teams/mandiasa.png";

export default function Team() {
  const dataTeam = [
    {
      id: "1",
      name: "I Gede Gelgel Abdiutama",
      status: "Ketua Tim",
      photoTeamURL: PhotoGelgel.src,
    },
    {
      id: "2",
      name: "Gede Bakti Pratama Putra",
      status: "Anggota",
      photoTeamURL: PhotoBakti.src,
    },
    {
      id: "3",
      name: "Ni Komang Diani",
      status: "Anggota",
      photoTeamURL: PhotoDiani.src,
    },
    {
      id: "4",
      name: "I Gusti Nyoman Merta Septiadi",
      status: "Anggota",
      photoTeamURL: PhotoSeptiadi.src,
    },
    {
      id: "5",
      name: "I Gusti Nyoman Sapta Wiguna",
      status: "Anggota",
      photoTeamURL: PhotoSapta.src,
    },
    {
      id: "6",
      name: "Made Waradiana Aryadi",
      status: "Anggota",
      photoTeamURL: PhotoWaradiana.src,
    },
    {
      id: "7",
      name: "Putu Mandiasa",
      status: "Anggota",
      photoTeamURL: PhotoMandiasa.src,
    },
  ];

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
        <div className="flex flex-wrap gap-4 sm:grid sm:grid-cols-7 sm:grid-rows-1 sm:gap-2 justify-center items-center">
          {dataTeam.map((item, index) => (
            <>
              <div className="flex flex-col justify-start items-center">
                <Image
                  key={index}
                  className="pb-2"
                  alt={item.name}
                  src={item.photoTeamURL.toString()}
                  width={96}
                  height={96}
                />
                <p className="text-tiny text-black text-center">
                  {item.status}
                </p>
                <p className="text-sm text-black text-center font-semibold">
                  {item.name}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
