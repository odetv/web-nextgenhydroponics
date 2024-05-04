import React, { Key } from "react";
import { useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { getAuth, User } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Link,
  Input,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Checkbox,
  Button,
  Tabs,
  Tab,
  Tooltip,
} from "@nextui-org/react";
import { Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export default function AuthForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState<string | number>("masuk");

  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

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
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error signing in with Google", error.message);
    }
  };

  const handleSignInWithEmailAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error signing in with email and password", error.message);
      setError("Email atau password salah. Silakan coba lagi!");
    }
  };

  const handleSignUpWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string,
    confirmPassword: string
  ) => {
    try {
      validateNameAndEmail(displayName, email);
      if (!validateEmail(email)) {
        throw new Error("Alamat email tidak valid!");
      }
      if (password !== confirmPassword) {
        throw new Error("Konfirmasi Password Tidak Cocok!");
      }
      if (!validatePassword(password)) {
        throw new Error(
          "Password harus minimal 8 karakter, mengandung huruf besar dan kecil, angka, serta simbol!"
        );
      }
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error signing up with email and password", error.message);
      setError(error.message);
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateNameAndEmail = (name: string, email: string) => {
    if (!name.trim()) {
      throw new Error("Nama lengkap harus diisi");
    }
    if (!email.trim()) {
      throw new Error("Alamat email harus diisi");
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Button
        color="success"
        variant="flat"
        onClick={onOpen}
        className="font-medium"
        radius="sm"
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
        className="mr-4 ml-4"
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
                        id="emailMasuk"
                        endContent={<EmailIcon color="disabled" />}
                        isRequired
                        label="Email"
                        placeholder="Email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="flex py-2 px-1 justify-between">
                        <Checkbox
                          classNames={{
                            label: "text-small",
                          }}
                        >
                          Ingat Saya
                        </Checkbox>
                        <Tooltip
                          showArrow={true}
                          size="sm"
                          content="Maaf, Fitur belum tersedia."
                          color="danger"
                        >
                          <Link color="primary" href="#" size="sm">
                            Lupa Password?
                          </Link>
                        </Tooltip>
                      </div>
                      <div className="flex flex-col gap-2">
                        {error && (
                          <p className="text-red-500 text-xs">{error}</p>
                        )}
                        <button
                          onClick={handleSignInWithEmailAndPassword}
                          className="bg-emerald-700 w-full mx-auto rounded-lg py-2 text-white hover:bg-emerald-800 transition-all ease-in-out"
                        >
                          Masuk
                        </button>
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
                              <p className="text-sm">Lanjutkan dengan Google</p>
                            </button>
                          </div>
                          <div className="flex flex-row gap-1 justify-center pb-6">
                            <p className="text-sm">Belum punya akun?</p>

                            <Link
                              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all ease-in-out cursor-pointer"
                              size="sm"
                              onPress={() => setSelected("daftar")}
                            >
                              Daftar Sekarang
                            </Link>
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
                        value={displayName}
                        onChange={(e) => setdisplayName(e.target.value)}
                      />
                      <Input
                        id="emailDaftar"
                        endContent={<EmailIcon color="disabled" />}
                        isRequired
                        label="Email"
                        placeholder="Email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        id="passwordDaftar"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Input
                        id="passwordDaftarKonfirmasi"
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div className="flex flex-col gap-2">
                        {error && (
                          <p className="text-red-500 text-xs">{error}</p>
                        )}
                        <button
                          onClick={() => {
                            handleSignUpWithEmailAndPassword(
                              email,
                              password,
                              displayName,
                              confirmPassword
                            );
                          }}
                          className="bg-emerald-700 w-full mx-auto rounded-lg py-2 text-white hover:bg-emerald-800 transition-all ease-in-out"
                        >
                          Daftar
                        </button>

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
                              <p className="text-sm">Lanjutkan dengan Google</p>
                            </button>
                          </div>
                          <div className="flex flex-row gap-1 justify-center pb-6">
                            <p className="text-sm">Sudah punya akun?</p>

                            <Link
                              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all ease-in-out cursor-pointer"
                              size="sm"
                              onPress={() => setSelected("masuk")}
                            >
                              Masuk
                            </Link>
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
