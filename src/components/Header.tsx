"use client";
import React from "react";
import {
  Navbar,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import GamepadIcon from "@mui/icons-material/Gamepad";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoNextGenHydroponics from "../assets/images/logo/LogoNextGenHydroponics.png";
import GuestIcon from "../assets/images/user/Guest.png";
import { useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { getAuth, User, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Header() {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error: any) {
      console.error("Error signing in with Google", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Navbar isBordered>
      <div className="-ml-3">
        <Image
          width={100}
          alt="Logo Next-Gen Hydroponics"
          src={LogoNextGenHydroponics.src}
        />
      </div>

      <div className="hidden sm:flex gap-4 font-medium">
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hover:text-green-800 transition-all ease-in-out duration-250"
          >
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hover:text-green-800 transition-all ease-in-out duration-250"
          >
            Produk
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hover:text-green-800 transition-all ease-in-out duration-250"
          >
            Fitur
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hover:text-green-800 transition-all ease-in-out duration-250"
          >
            Tentang
          </Link>
        </NavbarItem>
      </div>

      <div className="items-center flex gap-4">
        <Input
          classNames={{
            base: "max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Cari sesuatu..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="success"
              size="sm"
              src={user?.photoURL || GuestIcon.src}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2 text-blue-800 bg-blue-100"
              color="secondary"
            >
              <div className="">
                <p className="font-semibold">
                  {user ? (
                    user.displayName
                  ) : (
                    <p className="text-center">Selamat Datang👋</p>
                  )}
                </p>
                <p className="font-medium text-xs text-green-800">
                  {user ? user.email : ""}
                </p>
              </div>
            </DropdownItem>
            <DropdownItem color="default" key="settings">
              <div className="flex flex-row items-center gap-1">
                <DashboardIcon color="action" />
                Dashboard
              </div>
            </DropdownItem>
            <DropdownItem color="default" key="settings">
              <div className="flex flex-row items-center gap-1">
                <CategoryIcon color="action" />
                Produk
              </div>
            </DropdownItem>
            <DropdownItem color="default" key="settings">
              <div className="flex flex-row items-center gap-1">
                <GamepadIcon color="action" />
                Fitur
              </div>
            </DropdownItem>
            <DropdownItem color="default" key="settings">
              <div className="flex flex-row items-center gap-1">
                <InfoIcon color="action" />
                Tentang
              </div>
            </DropdownItem>
            <DropdownItem color="default" key="settings">
              <div className="flex flex-row items-center gap-1">
                <SettingsIcon color="action" />
                Pengaturan
              </div>
            </DropdownItem>
            <DropdownItem color="default" key="help_and_feedback">
              <div className="flex flex-row items-center gap-1">
                <HelpIcon color="action" />
                Bantuan
              </div>
            </DropdownItem>
            <DropdownItem
              color="danger"
              key="logout"
              className="mt-1 bg-red-100"
            >
              <div className="font-semibold text-red-800 flex flex-row items-center justify-center">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex flex-row items-center gap-1"
                  >
                    <p>Keluar</p>
                    <LogoutIcon />
                  </button>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    className="flex flex-row items-center gap-1"
                  >
                    <p>Masuk</p>
                    <LoginIcon />
                  </button>
                )}
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Navbar>
  );
}
