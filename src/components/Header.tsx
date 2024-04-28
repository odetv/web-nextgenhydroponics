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
  NavbarBrand,
  NavbarContent,
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
      <NavbarContent className="-ml-3">
        <Image
          width={100}
          alt="Logo Next-Gen Hydroponics"
          src={LogoNextGenHydroponics.src}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 font-medium">
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
      </NavbarContent>

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
              color="secondary"
              textValue="profile"
              className="h-14 gap-2 text-blue-800 bg-blue-100"
            >
              <div>
                <div className="font-semibold">
                  {user ? (
                    user.displayName
                  ) : (
                    <p className="text-center">Selamat Datang👋</p>
                  )}
                </div>
                <div className="font-medium text-xs text-green-800">
                  {user ? user.email : ""}
                </div>
              </div>
            </DropdownItem>
            <DropdownItem color="default" key="dashboard" textValue="Dashboard">
              <NavbarContent className="flex flex-row items-center gap-1">
                <DashboardIcon color="action" />
                Dashboard
              </NavbarContent>
            </DropdownItem>
            <DropdownItem color="default" key="produk" textValue="produk">
              <NavbarContent className="flex flex-row items-center gap-1">
                <CategoryIcon color="action" />
                Produk
              </NavbarContent>
            </DropdownItem>
            <DropdownItem color="default" key="fitur" textValue="fitur">
              <NavbarContent className="flex flex-row items-center gap-1">
                <GamepadIcon color="action" />
                Fitur
              </NavbarContent>
            </DropdownItem>
            <DropdownItem color="default" key="tentang" textValue="tentang">
              <NavbarContent className="flex flex-row items-center gap-1">
                <InfoIcon color="action" />
                Tentang
              </NavbarContent>
            </DropdownItem>
            <DropdownItem
              color="default"
              key="pengaturan"
              textValue="pengaturan"
            >
              <NavbarContent className="flex flex-row items-center gap-1">
                <SettingsIcon color="action" />
                Pengaturan
              </NavbarContent>
            </DropdownItem>
            <DropdownItem color="default" key="bantuan" textValue="bantuan">
              <NavbarContent className="flex flex-row items-center gap-1">
                <HelpIcon color="action" />
                Bantuan
              </NavbarContent>
            </DropdownItem>
            <DropdownItem
              color="danger"
              key="logout"
              className="mt-1 bg-red-100"
              textValue="actionauth"
            >
              <NavbarContent className="font-semibold text-red-800 flex flex-row items-center justify-center">
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
              </NavbarContent>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Navbar>
  );
}
