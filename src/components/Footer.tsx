"use client";
import LogoNextGenHydroponics from "../assets/images/logo/LogoNextGenHydroponics.png";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Link from "next/link";
import { app } from "../../firebaseConfig";
import { getAuth, User, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

function Footer() {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <footer className="px-4 divide-y divide-emerald-500 bg-emerald-700 text-white">
      <div className="container flex flex-col justify-between items-center py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <div className="flex justify-center space-x-3 lg:justify-start">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center w-32 h-32 rounded-full bg-white">
                <Image
                  width={100}
                  height={100}
                  style={{ height: "auto", width: "auto" }}
                  src={LogoNextGenHydroponics.src}
                  alt=""
                />
              </div>
              <span className="text-2xl font-semibold uppercase">
                Next-Gen Hydroponics
              </span>
              <p className="text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                Website Resmi Tim Next-Gen Hydroponics Program Merdeka Belajar
                Kampus Merdeka Riset Independen Smart Green Garden PT. Dago
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
              Area Terbuka Hijau Fakultas Teknik dan Kejuruan (Selatan Stadion
              FOK), Universitas Pendidikan Ganesha Jinengdalem, Kecamatan
              Buleleng, Kabupaten Buleleng, Bali 81119.
            </a>
          </div>
          <div className="space-y-3">
            <div className="uppercase font-bold text-gray-50">Kontak</div>
            <div className="flex flex-col gap-1">
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
                href="https://wa.me/6285739683673"
                target="_blank"
                title="WhatsApp"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <WhatsAppIcon />
                <p className="pl-2 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                  +6285739683673
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
                <p className="pl-2 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm break-all">
                  research.nextgenhydroponics@gmail.com
                </p>
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="tracki uppercase font-bold text-gray-50">HALAMAN</h3>
            {user ? (
              <ul className="sm:grid sm:grid-cols-2 sm:grid-rows-3 space-y-1 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                <li key="beranda">
                  <Link
                    rel="noopener noreferrer"
                    href="/#beranda"
                    className="hover:text-emerald-400 transition-all ease-in-out"
                  >
                    Beranda
                  </Link>
                </li>
                <li key="dashboard">
                  <Link
                    rel="noopener noreferrer"
                    href="/dashboard"
                    className="hover:text-emerald-400 transition-all ease-in-out"
                  >
                    Dashboard
                  </Link>
                </li>
                <li key="overview">
                  <Link
                    rel="noopener noreferrer"
                    href="/#overview"
                    className="hover:text-emerald-400 transition-all ease-in-out"
                  >
                    Overview
                  </Link>
                </li>
                <li key="blog">
                  <Link
                    rel="noopener noreferrer"
                    href="/blog"
                    className="hover:text-emerald-400 transition-all ease-in-out"
                  >
                    Blog
                  </Link>
                </li>
                <li key="setting">
                  <Link
                    rel="noopener noreferrer"
                    href="/setting"
                    className="hover:text-emerald-400 transition-all ease-in-out"
                  >
                    Pengaturan
                  </Link>
                </li>
                <li key="help">
                  <Link
                    rel="noopener noreferrer"
                    href="/help"
                    className="hover:text-emerald-400 transition-all ease-in-out"
                  >
                    Bantuan
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="space-y-1 text-tiny sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                <li key="beranda">
                  <Link
                    rel="noopener noreferrer"
                    href="/#beranda"
                    className="hover:text-emerald-400 transition-all ease-in-out"
                  >
                    Beranda
                  </Link>
                </li>
                <li key="overview">
                  <Link
                    rel="noopener noreferrer"
                    href="/#overview"
                    className="hover:text-emerald-400 transition-all ease-in-out"
                  >
                    Overview
                  </Link>
                </li>
                <li key="blog">
                  <Link
                    rel="noopener noreferrer"
                    href="/blog"
                    className="hover:text-emerald-400 transition-all ease-in-out"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="py-4 text-[11px] text-center text-gray-200">
        <p rel="noopener noreferrer">
          <Link href="#" className="cursor-none">
            ©️2024{" "}
          </Link>
          <Link
            href="https://www.smartgreenovation.com/"
            className="hover:text-emerald-400 transition-all ease-in-out"
          >
            Smart Green Garden{" "}
          </Link>
          <Link
            href="/"
            className="hover:text-emerald-400 transition-all ease-in-out"
          >
            | Next-Gen Hydroponics{" "}
          </Link>
          <Link
            href="/"
            className="hover:text-emerald-400 transition-all ease-in-out"
          >
            | All rights reserved
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
