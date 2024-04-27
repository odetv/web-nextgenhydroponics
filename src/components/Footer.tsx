import LogoNextGenHydroponics from "../assets/image/logo/LogoNextGenHydroponics.png";
import { Image, Link } from "@nextui-org/react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function Footer() {
  return (
    <footer className="px-4 divide-y divide-emerald-500 bg-emerald-700 text-white">
      <div className="container flex flex-col justify-between items-center py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <div className="flex justify-center space-x-3 lg:justify-start">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center w-32 h-32 rounded-full bg-white">
                <Image
                  className="h-14 w-auto"
                  src={LogoNextGenHydroponics.src}
                  alt=""
                />
              </div>
              <span className="text-2xl font-semibold uppercase">
                Next-Gen Hydroponics
              </span>
              <p className="text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                Website Tim Next-Gen Hydroponics Program Merdeka Belajar Kampus
                Merdeka Riset Independen Smart Green Garden antara Dago
                Engineering dengan Fakultas Teknik dan Kejuruan Undiksha.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
          <div className="space-y-3">
            <h3 className="tracki uppercase font-bold text-gray-50 mb-3">
              Lokasi
            </h3>
            <a
              className="text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm hover:text-emerald-400 transition-all ease-in-out"
              href="https://maps.app.goo.gl/H2u9DoGydFsw6uu9A"
              target="_blank"
            >
              Universitas Pendidikan Ganesha Jinengdalem, Kecamatan Buleleng,
              Kabupaten Buleleng, Bali 81119
            </a>
          </div>
          <div className="space-y-3">
            <div className="uppercase font-bold text-gray-50">Kontak</div>
            <div className="flex flex-col gap-1">
              <a
                rel="noopener noreferrer"
                href="https://wa.me/6285739683673/"
                target="_blank"
                title="WhatsApp"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <WhatsAppIcon />
                <p className="pl-2 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                  085739683673
                </p>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://instagram.com/nextgen.hydroponics"
                target="_blank"
                title="Instagram"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <InstagramIcon />
                <p className="pl-2 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                  nextgen.hydroponics
                </p>
              </a>
              <a
                rel="noopener noreferrer"
                href="mailto:research.nextgenhydroponics@gmail.com"
                target="_blank"
                title="Email"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <MailOutlineIcon />
                <p className="pl-2 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                  research.nextgenhydroponics@gmail.com
                </p>
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="tracki uppercase font-bold text-gray-50">HALAMAN</h3>
            <ul className="space-y-1 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
              <li>
                <a
                  rel="noopener noreferrer"
                  href="/#"
                  className="hover:text-emerald-400 transition-all ease-in-out"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="/#"
                  className="hover:text-emerald-400 transition-all ease-in-out"
                >
                  Produk
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="/#"
                  className="hover:text-emerald-400 transition-all ease-in-out"
                >
                  Fitur
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="/#"
                  className="hover:text-emerald-400 transition-all ease-in-out"
                >
                  Tentang
                </a>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-4 text-[11px] text-center text-gray-200">
        <p rel="noopener noreferrer">
          <a
            href="/"
            className="hover:text-emerald-400 transition-all ease-in-out"
          >
            ©️2024 Next-Gen Hydroponics | All rights reserved
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
