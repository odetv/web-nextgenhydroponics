"use client";
import { useState, useEffect } from "react";
import { app } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import AuthenticationForm from "./AuthenticationForm";
import {
  Navbar,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarContent,
  Tooltip,
  Badge,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { SearchIcon } from "./SearchIcon";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoNextGenHydroponics from "../assets/images/logo/LogoNextGenHydroponics.png";
import GuestIcon from "../assets/images/user/Guest.png";
import Link from "next/link";
import Notification from "./Notification";
import { useUserAuthentication } from "../services/usersService";

export default function Header() {
  const { user, setUser, handleLogout } = useUserAuthentication();
  const [activeMenu, setActiveMenu] = useState<string>("");

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
  }, [setUser]);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <Navbar isBordered>
      <NavbarContent className="-ml-3">
        <Link href="/">
          <Image
            width={100}
            height={100}
            style={{ height: "auto", width: 100 }}
            alt="Logo Next-Gen Hydroponics"
            src={LogoNextGenHydroponics.src}
          />
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 font-medium">
        {user ? (
          <>
            <NavbarItem>
              <Link
                color="foreground"
                href="/#beranda"
                className={`hover:text-green-800 transition-all ease-in-out duration-250 ${
                  activeMenu === "/#beranda"
                    ? "text-green-800 font-semibold"
                    : ""
                }`}
                onClick={() => handleMenuClick("/#beranda")}
              >
                Beranda
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                color="foreground"
                href="/dashboard"
                className={`hover:text-green-800 transition-all ease-in-out duration-250 ${
                  activeMenu === "/dashboard"
                    ? "text-green-800 font-semibold"
                    : ""
                }`}
                onClick={() => handleMenuClick("/dashboard")}
              >
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                color="foreground"
                href="/#overview"
                className={`hover:text-green-800 transition-all ease-in-out duration-250 ${
                  activeMenu === "/#overview"
                    ? "text-green-800 font-semibold"
                    : ""
                }`}
                onClick={() => handleMenuClick("/#overview")}
              >
                Overview
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                color="foreground"
                href="/blog"
                className={`hover:text-green-800 transition-all ease-in-out duration-250 ${
                  activeMenu === "/blog" ? "text-green-800 font-semibold" : ""
                }`}
                onClick={() => handleMenuClick("/blog")}
              >
                Blog
              </Link>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link
                color="foreground"
                href="/#beranda"
                className={`hover:text-green-800 transition-all ease-in-out duration-250 ${
                  activeMenu === "/#beranda"
                    ? "text-green-800 font-semibold"
                    : ""
                }`}
                onClick={() => handleMenuClick("/#beranda")}
              >
                Beranda
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                color="foreground"
                href="/#overview"
                className={`hover:text-green-800 transition-all ease-in-out duration-250 ${
                  activeMenu === "/#overview"
                    ? "text-green-800 font-semibold"
                    : ""
                }`}
                onClick={() => handleMenuClick("/#overview")}
              >
                Overview
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                color="foreground"
                href="/blog"
                className={`hover:text-green-800 transition-all ease-in-out duration-250 ${
                  activeMenu === "/blog" ? "text-green-800 font-semibold" : ""
                }`}
                onClick={() => handleMenuClick("/blog")}
              >
                Blog
              </Link>
            </NavbarItem>
          </>
        )}
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
          <>
            <div>
              <Notification />
            </div>
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="success"
                  size="sm"
                  alt={user?.displayName || ""}
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
                    <Link href="/profile">
                      <div>
                        <div className="font-semibold">
                          {user ? user.displayName : ""}
                        </div>
                        <div className="font-medium text-xs text-green-800">
                          {user ? user.email : ""}
                        </div>
                      </div>
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    color="default"
                    key="beranda"
                    textValue="beranda"
                  >
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/#beranda"
                      color="foreground"
                      onClick={() => handleMenuClick("/#beranda")}
                    >
                      <HomeIcon color="action" />
                      Beranda
                    </Link>
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
                      onClick={() => handleMenuClick("/dashboard")}
                    >
                      <DashboardIcon color="action" />
                      Dashboard
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    color="default"
                    key="overview"
                    textValue="overview"
                  >
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/#overview"
                      color="foreground"
                      onClick={() => handleMenuClick("/#overview")}
                    >
                      <CategoryIcon color="action" />
                      Overview
                    </Link>
                  </DropdownItem>
                  <DropdownItem color="default" key="blog" textValue="blog">
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/blog"
                      color="foreground"
                      onClick={() => handleMenuClick("/blog")}
                    >
                      <ArticleIcon color="action" />
                      Blog
                    </Link>
                  </DropdownItem>

                  <DropdownItem color="default" key="admin" textValue="admin">
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/admin"
                      color="foreground"
                      onClick={() => handleMenuClick("/admin")}
                    >
                      <AdminPanelSettingsIcon color="action" />
                      Admin Panel
                    </Link>
                  </DropdownItem>

                  {/* <DropdownItem
                    color="default"
                    key="pengaturan"
                    textValue="pengaturan"
                  >
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/setting"
                      color="foreground"
                    >
                      <SettingsIcon color="action" />
                      Pengaturan
                    </Link>
                  </DropdownItem> */}
                  <DropdownItem
                    color="default"
                    key="bantuan"
                    textValue="bantuan"
                  >
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/help"
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
          </>
        ) : (
          <>
            <AuthenticationForm />
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="success"
                  size="sm"
                  alt="Guest"
                  src={GuestIcon.src}
                />
              </DropdownTrigger>
              <div className="font-semibold flex flex-row items-center justify-center">
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    color="default"
                    key="beranda"
                    textValue="beranda"
                  >
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/#beranda"
                      color="foreground"
                      onClick={() => handleMenuClick("/#beranda")}
                    >
                      <HomeIcon color="action" />
                      Beranda
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    color="default"
                    key="overview"
                    textValue="overview"
                  >
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/#overview"
                      color="foreground"
                      onClick={() => handleMenuClick("/#overview")}
                    >
                      <CategoryIcon color="action" />
                      Overview
                    </Link>
                  </DropdownItem>
                  <DropdownItem color="default" key="blog" textValue="blog">
                    <Link
                      className="flex flex-row items-center gap-1"
                      href="/blog"
                      color="foreground"
                      onClick={() => handleMenuClick("/blog")}
                    >
                      <ArticleIcon color="action" />
                      Blog
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
