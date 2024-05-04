"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import app from "../../firebaseConfig";
import { getAuth, User, signOut } from "firebase/auth";
import AuthForm from "./AuthForm";
import {
  Navbar,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
  NavbarContent,
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoNextGenHydroponics from "../assets/images/logo/LogoNextGenHydroponics.png";
import GuestIcon from "../assets/images/user/Guest.png";
import Link from "next/link";

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
        <Link href="/">
          <Image
            width={100}
            alt="Logo Next-Gen Hydroponics"
            src={LogoNextGenHydroponics.src}
          />
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 font-medium">
        <NavbarItem>
          <Link
            color="foreground"
            href="/dashboard"
            className="hover:text-green-800 transition-all ease-in-out duration-250"
          >
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/#"
            className="hover:text-green-800 transition-all ease-in-out duration-250"
          >
            Produk
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/blog"
            className="hover:text-green-800 transition-all ease-in-out duration-250"
          >
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/#"
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
            radius="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </Tooltip>
        {user ? (
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
            <div className="font-semibold flex flex-row items-center justify-center">
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
                  <Link
                    className="flex flex-row items-center gap-1"
                    href="/dashboard"
                    color="foreground"
                  >
                    <DashboardIcon color="action" />
                    Dashboard
                  </Link>
                </DropdownItem>
                <DropdownItem color="default" key="produk" textValue="produk">
                  <Link
                    className="flex flex-row items-center gap-1"
                    href="/#"
                    color="foreground"
                  >
                    <CategoryIcon color="action" />
                    Produk
                  </Link>
                </DropdownItem>
                <DropdownItem color="default" key="blog" textValue="blog">
                  <Link
                    className="flex flex-row items-center gap-1"
                    href="/blog"
                    color="foreground"
                  >
                    <ArticleIcon color="action" />
                    Blog
                  </Link>
                </DropdownItem>
                <DropdownItem color="default" key="tentang" textValue="tentang">
                  <Link
                    className="flex flex-row items-center gap-1"
                    href="/#"
                    color="foreground"
                  >
                    <InfoIcon color="action" />
                    Tentang
                  </Link>
                </DropdownItem>
                <DropdownItem
                  color="default"
                  key="pengaturan"
                  textValue="pengaturan"
                >
                  <Link
                    className="flex flex-row items-center gap-1"
                    href="/#"
                    color="foreground"
                  >
                    <SettingsIcon color="action" />
                    Pengaturan
                  </Link>
                </DropdownItem>
                <DropdownItem color="default" key="bantuan" textValue="bantuan">
                  <Link
                    className="flex flex-row items-center gap-1"
                    href="/#"
                    color="foreground"
                  >
                    <HelpIcon color="action" />
                    Bantuan
                  </Link>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  key="logout"
                  className="mt-1 bg-blue-100"
                  textValue="actionauth"
                >
                  <NavbarContent
                    className="font-semibold text-red-800 flex flex-row items-center justify-center"
                    onClick={handleLogout}
                  >
                    <button className="flex flex-row items-center gap-1">
                      <p>Keluar</p>
                      <LogoutIcon />
                    </button>
                  </NavbarContent>
                </DropdownItem>
              </DropdownMenu>
            </div>
          </Dropdown>
        ) : (
          <>
            <AuthForm />
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="success"
                  size="sm"
                  src={GuestIcon.src}
                />
              </DropdownTrigger>
              <div className="font-semibold flex flex-row items-center justify-center">
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    color="default"
                    key="dashboard"
                    textValue="Dashboard"
                  >
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/dashboard"
                      color="foreground"
                    >
                      <DashboardIcon color="action" />
                      Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem color="default" key="produk" textValue="produk">
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/#"
                      color="foreground"
                    >
                      <CategoryIcon color="action" />
                      Produk
                    </Link>
                  </DropdownItem>
                  <DropdownItem color="default" key="blog" textValue="blog">
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/blog"
                      color="foreground"
                    >
                      <ArticleIcon color="action" />
                      Blog
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    color="default"
                    key="tentang"
                    textValue="tentang"
                  >
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/#"
                      color="foreground"
                    >
                      <InfoIcon color="action" />
                      Tentang
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </div>
            </Dropdown>
          </>
        )}
      </div>
    </Navbar>
  );
}
