"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
  Divider,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import LogoNextGenHydroponics from "../assets/image/logo/LogoNextGenHydroponics.png";

export default function App() {
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
              name="Jason Hughes"
              size="sm"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoYalG0iZwdwwSFMhNL4aDADjcSJFcuo31Y9OY6saF8ZG5dq3lLc8uXw0eJfUwvdwjTw&usqp=CAU"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2 text-blue-800"
              color="secondary"
            >
              <p className="font-semibold">Selamat datang,</p>
              <p className="font-semibold">👤Tamu</p>
            </DropdownItem>
            <DropdownItem color="success" key="settings">
              Dashboard
            </DropdownItem>
            <DropdownItem color="success" key="settings">
              Produk
            </DropdownItem>
            <DropdownItem color="success" key="settings">
              Fitur
            </DropdownItem>
            <DropdownItem color="success" key="settings">
              Tentang
            </DropdownItem>
            <DropdownItem color="success" key="settings">
              Pengaturan
            </DropdownItem>
            <DropdownItem color="success" key="help_and_feedback">
              Bantuan
            </DropdownItem>
            <DropdownItem color="success" key="logout" className="mt-1">
              <p className="font-semibold text-red-800">Log Out →</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Navbar>
  );
}
