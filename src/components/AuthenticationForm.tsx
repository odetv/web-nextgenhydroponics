import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { app, storage } from "../../firebaseConfig";
import {
  getAuth,
  updateProfile,
  User,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export default function AuthenticationForm() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState<string | number>("masuk");
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const auth = getAuth(app);

  const [fullName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [photoProfile, setPhotoProfile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);

  // const afterAuth = "/dashboard";
  const ADMIN_EMAILS =
    process.env.NEXT_PUBLIC_VERCEL_ADMIN_EMAILS?.split(",") ?? [];

  const isAdmin = (email: string | null): boolean => {
    return email ? ADMIN_EMAILS.includes(email) : false;
  };

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
      // await signInWithPopup(auth, provider);
      // router.push(afterAuth);
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const destination = isAdmin(result.user.email)
          ? "/admin"
          : "/dashboard";
        router.push(destination);
      }
    } catch (error: any) {
      console.error("Error signing in with Google", error.message);
    }
  };

  const handleSignInWithEmailAndPassword = async () => {
    try {
      // await signInWithEmailAndPassword(auth, email, password);
      // router.refresh();
      // setTimeout(() => {
      //   router.push(afterAuth);
      // }, 500);
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        const destination = isAdmin(result.user.email)
          ? "/admin"
          : "/dashboard";
        router.refresh();
        setTimeout(() => {
          router.push(destination);
        }, 500);
      }
    } catch (error: any) {
      console.error("Error signing in with email and password", error.message);
      setError("Email atau password salah. Silakan coba lagi!");
    }
  };

  const handleSignUpWithEmailAndPassword = async (
    email: string,
    password: string,
    fullName: string,
    confirmPassword: string
  ) => {
    try {
      if (!validateName(fullName)) {
        throw new Error("Nama tidak boleh mengandung karakter selain abjad!");
      }
      if (!validateEmail(email)) {
        throw new Error("Alamat Email tidak valid!");
      }
      if (!validatePassword(password)) {
        throw new Error(
          "Password minimal 8 karakter, mengandung huruf besar dan kecil, angka, serta simbol!"
        );
      }
      if (!validateConfirmPassword(confirmPassword)) {
        throw new Error(
          "Password minimal 8 karakter, mengandung huruf besar dan kecil, angka, serta simbol!"
        );
      }
      if (password !== confirmPassword) {
        throw new Error("Konfirmasi Password Tidak Cocok!");
      }
      if (!photoProfile) {
        throw new Error("Foto profil tidak boleh kosong!");
      }
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, { displayName: fullName });
        if (photoProfile) {
          const storageRef = ref(
            storage,
            `user/photoProfile/${currentUser.uid}`
          );
          await uploadBytes(storageRef, photoProfile);
          const downloadURL = await getDownloadURL(storageRef);
          setProfileImageUrl(downloadURL);
          await updateProfile(currentUser, { photoURL: downloadURL });
        }
      }
      // router.refresh();
      // setTimeout(() => {
      //   router.push(afterAuth);
      // }, 500);

      if (currentUser && currentUser.email) {
        const destination = isAdmin(currentUser.email)
          ? "/admin"
          : "/dashboard";
        router.refresh();
        setTimeout(() => {
          router.push(destination);
        }, 500);
      } else {
        setError("Tidak dapat mendapatkan email pengguna.");
      }
      // const destination = isAdmin(currentUser.email) ? "/admin" : "/dashboard";
      // router.refresh();
      // setTimeout(() => {
      //   router.push(destination);
      // }, 500);
    } catch (error: any) {
      console.error("Error signing up with email and password", error.message);
      setError(error.message);
    }
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      try {
        validatePhoto(selectedFile);
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewUrl(reader.result as string);
            setIsPhotoSelected(true);
          }
        };
        reader.readAsDataURL(selectedFile);
        setPhotoProfile(selectedFile);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  const validateName = (name: string) => {
    if (!name.trim()) {
      throw new Error("Nama Lengkap tidak boleh kosong!");
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      throw new Error("Alamat email tidak boleh kosong!");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) {
      throw new Error("Password tidak boleh kosong!");
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword.trim()) {
      throw new Error("Konfirmasi Password tidak boleh kosong!");
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(confirmPassword);
  };

  const validatePhoto = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Harap unggah file gambar (png, jpeg, jpg)!");
    }
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
                          className="bg-emerald-700 w-full mx-auto rounded-lg py-2 text-white hover:bg-emerald-800 transition-all ease-in-out font-semibold"
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
                        value={fullName}
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

                      <div className="flex flex-col justify-center items-center rounded-md pt-4 pb-4 cursor-pointer outline-dashed outline-gray-300 outline-2 outline-offset-2 m-1 bg-slate-100">
                        <p
                          className="text-center text-xs text-gray-600"
                          style={{
                            display: isPhotoSelected ? "none" : "inline-block",
                          }}
                        >
                          Upload Foto Profil
                        </p>
                        <input
                          id="photoProfile"
                          type="file"
                          className="text-xs text-gray-600"
                          onChange={handleProfileImageChange}
                          style={{
                            display: isPhotoSelected ? "none" : "inline-block",
                          }}
                        />
                        {previewUrl && (
                          <div className="relative">
                            <Image
                              src={previewUrl}
                              alt="Preview Foto Profil"
                              className="w-32 h-32 rounded-full object-cover mt-2"
                            />
                            <button
                              className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 p-1 bg-white rounded-full text-red-500 hover:bg-red-100 hover:text-red-700 focus:outline-none"
                              onClick={() => {
                                setPreviewUrl(null);
                                setPhotoProfile(null);
                                setIsPhotoSelected(false);
                                const fileInput = document.getElementById(
                                  "photoProfile"
                                ) as HTMLInputElement;
                                if (fileInput) {
                                  fileInput.value = "";
                                }
                              }}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {error && (
                          <p className="text-red-500 text-xs">{error}</p>
                        )}
                        <button
                          onClick={() => {
                            handleSignUpWithEmailAndPassword(
                              email,
                              password,
                              fullName,
                              confirmPassword
                            );
                          }}
                          className="bg-emerald-700 w-full mx-auto rounded-lg py-2 text-white hover:bg-emerald-800 transition-all ease-in-out font-semibold"
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
