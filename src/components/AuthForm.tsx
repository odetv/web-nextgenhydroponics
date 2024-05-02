import React, { Key } from "react";
import { useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { getAuth, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  Link,
  Input,
  Image,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Checkbox,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState<string | number>("login");

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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

  return (
    <>
      <Button
        color="success"
        variant="solid"
        onClick={onOpen}
        className="text-white font-medium"
      >
        Masuk
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        scrollBehavior="outside"
        shadow="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="text-center">
                <Tabs
                  aria-label="Options"
                  variant="underlined"
                  size="md"
                  color="success"
                  className="pt-4 font-semibold text-sm"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab key="masuk" title="Masuk">
                    <ModalHeader className="flex flex-col text-center">
                      <p>Masuk</p>
                      <p className="pb-2 text-sm font-normal">
                        Jelajahi Kembali Next-Gen Hydroponics
                      </p>
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        endContent={<EmailIcon color="disabled" />}
                        isRequired
                        label="Email"
                        placeholder="Email"
                        variant="bordered"
                      />
                      <Input
                        id="passwordMasuk"
                        isRequired
                        label="Password"
                        placeholder="Password"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                      />
                      <div className="flex py-2 px-1 justify-between">
                        <Checkbox
                          classNames={{
                            label: "text-small",
                          }}
                        >
                          Ingat Saya
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
                              <Link
                                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all ease-in-out cursor-pointer"
                                size="sm"
                                onPress={() => setSelected("daftar")}
                              >
                                Daftar Sekarang
                              </Link>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  </Tab>
                  <Tab key="daftar" title="Daftar">
                    <ModalHeader className="flex flex-col text-center">
                      <p>Daftar</p>
                      <p className="pb-2 text-sm font-normal">
                        Jadilah Bagian Next-Gen Hydroponics
                      </p>
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        endContent={<PersonIcon color="disabled" />}
                        isRequired
                        label="Nama Lengkap"
                        placeholder="Nama Lengkap"
                        variant="bordered"
                      />
                      <Input
                        endContent={<EmailIcon color="disabled" />}
                        isRequired
                        label="Email"
                        placeholder="Email"
                        variant="bordered"
                      />
                      <Input
                        id="passwordDaftar1"
                        isRequired
                        label="Password"
                        placeholder="Password"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                      />
                      <Input
                        id="passwordDaftar2"
                        isRequired
                        label="Konfirmasi Password"
                        placeholder="Konfirmasi Password"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                      />
                      <div className="flex flex-col gap-2">
                        <Tooltip
                          showArrow={true}
                          size="sm"
                          content="Maaf, Fitur belum tersedia."
                          color="danger"
                        >
                          <button className="bg-emerald-700 w-full mx-auto rounded-lg py-2 text-white hover:bg-emerald-800 transition-all ease-in-out">
                            Daftar
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
                              <p className="text-sm">Sign up with Google</p>
                            </button>
                          </div>
                          <div className="flex flex-row gap-1 justify-center pb-6">
                            <p className="text-sm">Sudah punya akun?</p>
                            <Tooltip
                              showArrow={true}
                              size="sm"
                              content="Maaf, Fitur belum tersedia."
                              color="danger"
                            >
                              <Link
                                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all ease-in-out cursor-pointer"
                                size="sm"
                                onPress={() => setSelected("masuk")}
                              >
                                Masuk
                              </Link>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  </Tab>
                </Tabs>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
