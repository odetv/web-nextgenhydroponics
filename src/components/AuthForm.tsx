import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Image,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon";
import { LockIcon } from "./LockIcon";
import LoginIcon from "@mui/icons-material/Login";
import { Divider } from "@mui/material";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="flex flex-row items-center gap-1 max-w-full mx-auto"
      >
        <p>Masuk</p>
        <LoginIcon />
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
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
                  <button className="bg-emerald-700 w-full mx-auto rounded-lg py-2 text-white hover:bg-emerald-800 transition-all ease-in-out">
                    Masuk
                  </button>
                  <Divider className="text-xs">Atau</Divider>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-center w-full mx-auto">
                      <button className="justify-center w-full mx-auto px-4 py-2 border flex gap-2 items-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-300 hover:bg-slate-100 transition-all ease-in-out">
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
                      <a
                        href="#"
                        className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all ease-in-out"
                      >
                        Daftar Sekarang
                      </a>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
