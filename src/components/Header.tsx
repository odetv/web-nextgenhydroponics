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
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import GamepadIcon from "@mui/icons-material/Gamepad";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoNextGenHydroponics from "../assets/images/logo/LogoNextGenHydroponics.png";
import GuestIcon from "../assets/images/user/Guest.png";
import { useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { getAuth, User, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import AuthForm from "../components/AuthForm";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon";
import { LockIcon } from "./LockIcon";
import LoginIcon from "@mui/icons-material/Login";
import { Divider } from "@mui/material";

export default function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        <Tooltip
          showArrow={true}
          size="sm"
          content="Maaf, Fitur belum tersedia."
          color="danger"
        >
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
        </Tooltip>

        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="success"
              size="sm"
              src={user?.photoURL || GuestIcon.src}
              onClick={onOpen}
            />
          </DropdownTrigger>
          <div className="font-semibold flex flex-row items-center justify-center">
            {user ? (
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  color="secondary"
                  textValue="profile"
                  className="h-14 gap-2 text-blue-800 bg-blue-100"
                >
                  <div>
                    <div className="font-semibold">
                      {user ? user.displayName : ""}
                    </div>
                    <div className="font-medium text-xs text-green-800">
                      {user ? user.email : ""}
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem
                  color="default"
                  key="dashboard"
                  textValue="Dashboard"
                >
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
                  className="mt-1 bg-blue-100"
                  textValue="actionauth"
                >
                  <NavbarContent className="font-semibold text-red-800 flex flex-row items-center justify-center">
                    <button
                      onClick={handleLogout}
                      className="flex flex-row items-center gap-1"
                    >
                      <p>Keluar</p>
                      <LogoutIcon />
                    </button>
                  </NavbarContent>
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                backdrop="blur"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col text-center">
                        <p className="pt-4">Masuk Sekarang</p>
                        <p className="pb-2 text-sm font-normal">
                          Mulai Jelajahi Next-Gen Hydroponics
                        </p>
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          autoFocus
                          endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                          }
                          label="Email"
                          placeholder="Email"
                          variant="bordered"
                        />
                        <Input
                          endContent={
                            <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                          }
                          label="Password"
                          placeholder="Password"
                          type="password"
                          variant="bordered"
                        />
                        <div className="flex py-2 px-1 justify-between">
                          <Checkbox
                            classNames={{
                              label: "text-small",
                            }}
                          >
                            Ingat saya
                          </Checkbox>
                          <Link color="primary" href="#" size="sm">
                            Lupa Password?
                          </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Tooltip
                            showArrow={true}
                            size="sm"
                            content="Maaf, Fitur belum tersedia."
                            color="danger"
                          >
                            <button className="bg-emerald-700 w-full mx-auto rounded-lg py-2 text-white hover:bg-emerald-800 transition-all ease-in-out">
                              Masuk
                            </button>
                          </Tooltip>

                          <Divider className="text-xs">Atau</Divider>
                          <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-center w-full mx-auto">
                              <button
                                onClick={signInWithGoogle}
                                className="justify-center w-full mx-auto px-4 py-2 border flex gap-2 items-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-300 hover:bg-slate-100 transition-all ease-in-out"
                              >
                                <Image
                                  className="w-6 h-6"
                                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                                  loading="lazy"
                                  alt="google logo"
                                  width={24}
                                  height={24}
                                />
                                <p className="text-sm">Login with Google</p>
                              </button>
                            </div>
                            <div className="flex flex-row gap-1 justify-center pb-6">
                              <p className="text-sm">Belum punya akun?</p>
                              <Tooltip
                                showArrow={true}
                                size="sm"
                                content="Maaf, Fitur belum tersedia."
                                color="danger"
                              >
                                <a
                                  href="#"
                                  className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all ease-in-out"
                                >
                                  Daftar Sekarang
                                </a>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            )}
          </div>
        </Dropdown>
      </div>
    </Navbar>
  );
}
