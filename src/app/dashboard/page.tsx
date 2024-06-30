"use client";
import * as React from "react";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "@/middleware/AuthenticationProviders";
import {
  Button,
  Input,
  Slider,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {
  ref,
  get,
  getDatabase,
  onValue,
  query,
  limitToLast,
  remove,
} from "firebase/database";
import { useEffect, useState } from "react";
import AuthenticationForm from "../../components/AuthenticationForm";
import Image from "next/image";
import MemoryIcon from "@mui/icons-material/Memory";
import WifiIcon from "@mui/icons-material/Wifi";
import SpeedIcon from "@mui/icons-material/Speed";
import RedIcon from "../../assets/images/components/red-circle.gif";
import AlertCheckAuth from "@/components/AlertCheckAuth";
import AlertLoginGuest from "@/components/AlertLoginGuest";
import AlertAuthorizedMember from "@/components/AlertAuthorizedMember";
import LineChartSuhuAir from "@/components/LineChartSuhuAir";
import LineChartSuhuUdara from "@/components/LineChartSuhuUdara";
import SpedoNutrisi from "@/components/SpedoNutrisi";
import SpedoPH from "@/components/SpedoPH";
import ListTanaman from "@/components/ListTanaman";
import WarningIcon from "@mui/icons-material/Warning";

export default function Dashboard() {
  const user = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loadingSuhu, setLoadingSuhu] = React.useState(false);
  const [loadingPH, setLoadingPH] = React.useState(false);
  const [isSelectedNFTDFT, setIsSelectedNFTDFT] = React.useState(true);
  const [isSelectedManualOtomatis, setIsSelectedManualOtomatis] =
    React.useState(true);
  const [isSelectedNutrisi, setIsSelectedNutrisi] = React.useState(true);
  const [isSelectedLampu, setIsSelectedLampu] = React.useState(true);
  const [isSelectedAI, setIsSelectedAI] = React.useState(true);
  const [isPreviewAI, setIsPreviewAI] = React.useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [photoHama, setPhotoHama] = useState("");
  const [statusHama, setStatusHama] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    if (user) {
      if (user.role === "admin" || user.role === "member") {
        setIsAuthorized(true);
      }
      setIsCheckingAuth(false);
    } else {
      setIsCheckingAuth(false);
    }
  }, [user]);

  useEffect(() => {
    const db = getDatabase();
    const photosRef = ref(db, "esp32cam");
    const unsubscribe = onValue(photosRef, (snapshot) => {
      let deletePromises: any[] = [];
      snapshot.forEach((dateSnapshot) => {
        dateSnapshot.forEach((timeSnapshot) => {
          const data = timeSnapshot.val();
          const timestamp = data.timestamp;
          const date = new Date(timestamp);
          const year = date.getFullYear();
          if (year === 2036) {
            console.log(`Removing invalid entry with timestamp: ${timestamp}`);
            const deletePromise = remove(timeSnapshot.ref)
              .then(() => {
                console.log("Invalid entry removed successfully");
              })
              .catch((error) => {
                console.error("Error removing invalid entry:", error);
              });
            deletePromises.push(deletePromise);
          }
        });
      });
      Promise.all(deletePromises).then(() => {
        const latestPhotoQuery = query(photosRef, limitToLast(1));
        onValue(latestPhotoQuery, (latestSnapshot) => {
          latestSnapshot.forEach((latestDateSnapshot) => {
            latestDateSnapshot.forEach((latestTimeSnapshot) => {
              const latestData = latestTimeSnapshot.val();
              const latestBase64String = latestData.photo_original;
              const latestPhotoHama = latestData.photo_hama;
              let latestStatusHama = latestData.status_hama;
              const latestTimestamp = latestData.timestamp;
              if (latestBase64String) {
                setImageUrl(latestBase64String);
              }
              if (latestPhotoHama) {
                setPhotoHama(latestPhotoHama);
              }
              if (latestStatusHama === "true" || latestStatusHama === "false") {
                latestStatusHama = JSON.parse(latestStatusHama);
                setStatusHama(
                  latestStatusHama ? "Terdeteksi" : "Tidak Terdeteksi"
                );
              } else {
                setStatusHama("Tidak Terdeteksi");
              }
              if (latestTimestamp) {
                setTimestamp(latestTimestamp);
              }
            });
          });
        });
      });
    });
    return () => unsubscribe();
  }, []);

  function handleSuhu() {
    setLoadingSuhu(true);
  }
  function handlePH() {
    setLoadingPH(true);
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (isCheckingAuth) {
    return <AlertCheckAuth />;
  }

  if (!user) {
    return <AlertLoginGuest />;
  }

  if (!isAuthorized) {
    return <AlertAuthorizedMember />;
  }

  return (
    <main className="flex flex-col justify-center items-center gap-3 pt-2 sm:pt-8 pb-8">
      {user ? (
        <>
          <div className="text-center p-4 gap-2">
            <p className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold pb-2">
              Selamat datang di Dashboard, {user ? user.displayName : ""}👋
            </p>
            <p>Jelajahi Sistem Next-Gen Hydroponics</p>
            <div className="mt-1 p-2 flex flex-wrap gap-3 justify-center items-center rounded-xl">
              <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                  <Chip
                    startContent={<MemoryIcon fontSize="small" />}
                    variant="faded"
                    color="primary"
                    size="lg"
                    className="cursor-pointer"
                  >
                    {status === "hidup" ? "Hidup" : "Mati"}
                  </Chip>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">
                      Mikrokontroller ESP32
                    </div>
                    <div className="text-tiny">Status: Mati</div>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                  <Chip
                    startContent={<SpeedIcon fontSize="small" />}
                    variant="faded"
                    color="primary"
                    size="lg"
                    className="cursor-pointer"
                  >
                    Bagus
                  </Chip>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">
                      Kondisi Mikrokontroller
                    </div>
                    <div className="text-tiny">Status: Bagus</div>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                  <Chip
                    startContent={<WifiIcon fontSize="small" />}
                    variant="faded"
                    color="primary"
                    size="lg"
                    className="cursor-pointer"
                  >
                    Terputus
                  </Chip>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">
                      Konektivitas Wifi Mikrokontroller
                    </div>
                    <div className="text-tiny">SSID: Smart Green Garden</div>
                    <div className="text-tiny">
                      IP Address:{" "}
                      <a href="http://192.168.100.172">192.168.100.172</a>
                    </div>
                    <div className="text-tiny">Status: Terputus</div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {/* <div className="flex flex-row justify-center items-center gap-4 -mb-6">
              <SpedoNutrisi />
              <SpedoPH />
            </div> */}
            <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 justify-center items-center gap-4 w-11/12 sm:w-4/6 md:w-4/6 lg:w-4/6 xl:w-4/6 mx-auto outline outline-slate-200 rounded-lg p-4">
              <LineChartSuhuAir />
              {/* <LineChartSuhuUdara /> */}
              <div className="flex flex-row justify-center items-center gap-4 -mb-6">
                <SpedoNutrisi />
                <SpedoPH />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-11/12 sm:w-4/6 md:w-4/6 lg:w-4/6 xl:w-4/6 mx-auto">
              <ListTanaman />
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 grid-rows-6 gap-6 sm:grid-cols-3 sm:grid-rows-2 sm:gap-6 md:grid-cols-3 md:grid-rows-2 md:gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6 xl:grid-cols-3 xl:grid-rows-2 xl:gap-6">
            <div
              id="irigasi"
              className="bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Sistem Saluran Irigasi Otomatis
              </p>
              <p className="text-sm">
                Atur saluran irigasi secara manual atau otomatis
              </p>
              <div className="pt-3">
                <p className="text-sm">Kapasitas Air Hidroponik: 58 Liter</p>
              </div>
              <div>
                <div className="flex flex-row gap-6 mt-4 mb-4 bg-green-200 p-4 rounded-lg justify-center items-center">
                  <div className="flex flex-row justify-center items-center gap-2 text-sm">
                    <Switch
                      size="sm"
                      isSelected={isSelectedManualOtomatis}
                      onValueChange={setIsSelectedManualOtomatis}
                      defaultSelected
                      color="success"
                    >
                      {isSelectedManualOtomatis ? "Otomatis" : "Manual"}
                    </Switch>
                  </div>
                </div>
                {isSelectedManualOtomatis ? (
                  <div>
                    <p className="text-sm">
                      Kebutuhan air diatur secara otomatis
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 grid-rows-2 justify-center items-center gap-2 text-sm ">
                    <div className="grid grid-cols-2 grid-rows-1 justify-start">
                      <Switch size="sm" color="primary">
                        Sumber Air
                      </Switch>
                      <Switch size="sm" color="primary">
                        Saluran Irigasi
                      </Switch>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-1 justify-start">
                      {/* <div className="flex flex-row justify-center items-center gap-2 text-sm">
                        <Switch
                          size="sm"
                          isSelected={isSelectedNFTDFT}
                          onValueChange={setIsSelectedNFTDFT}
                          defaultSelected
                          color="success"
                        >
                          {isSelectedNFTDFT ? "DFT" : "NFT"}
                        </Switch>
                      </div> */}
                      <Switch size="sm" color="primary">
                        Pompa
                      </Switch>
                      <Switch size="sm" color="primary">
                        Pengaduk
                      </Switch>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              id="suhu"
              className="bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol Suhu
              </p>
              <p className="text-sm">Kondisi suhu air hidroponik</p>
              <div className="w-11/12 grid grid-rows-1 grid-cols-1 justify-center items-center text-sm pt-4 gap-3">
                {/* <div className="flex flex-row justify-start items-center gap-2 bg-green-200 p-2 rounded-lg">
                  <Slider
                    isDisabled
                    hideThumb={true}
                    label="Suhu Udara"
                    color="danger"
                    hideValue={true}
                    step={1}
                    maxValue={100}
                    minValue={0}
                    defaultValue={75}
                  />
                  <div className="flex flex-row items-center justify-center">
                    <ThermostatIcon color="error" />
                    <p className="text-sm">36°C</p>
                  </div>
                </div> */}
                <div className="flex flex-col gap-2 bg-green-200 p-2 rounded-lg">
                  <div className="flex flex-row gap-2 justify-start items-center">
                    <Slider
                      isDisabled
                      hideThumb={true}
                      label="Suhu Air"
                      color="primary"
                      hideValue={true}
                      step={1}
                      maxValue={100}
                      minValue={0}
                      defaultValue={50}
                    />
                    <div className="flex flex-row items-center justify-center">
                      <ThermostatIcon color="primary" />
                      <p className="text-sm">32°C</p>
                    </div>
                  </div>
                  {/* <LoadingButton
                    size="small"
                    onClick={handleSuhu}
                    loading={loadingSuhu}
                    loadingIndicator="Proses..."
                    variant="text"
                    className=""
                  >
                    <span>Segarkan</span>
                  </LoadingButton> */}
                </div>
              </div>
            </div>
            <div
              id="nutrisi"
              className="bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol Nutrisi
              </p>
              <p className="text-sm">
                Atur nutrisi tanaman secara manual atau otomatis
              </p>
              <div className="pt-3">
                <p className="text-sm">Kapasitas Nutrisi A: 4 Liter</p>
                <p className="text-sm">Kapasitas Nutrisi B: 5 Liter</p>
              </div>
              <div>
                <div className="bg-green-200 flex flex-row p-4 mt-4 mb-4 gap-6 rounded-lg justify-between items-center">
                  <div className="flex flex-row justify-center items-center gap-2 text-sm">
                    <Switch
                      size="sm"
                      isSelected={isSelectedNutrisi}
                      onValueChange={setIsSelectedNutrisi}
                      defaultSelected
                      color="success"
                    >
                      {isSelectedNutrisi ? "Otomatis" : "Manual"}
                    </Switch>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-1 text-sm bg-green-300 p-2 rounded-lg">
                    <p>Nutrisi:</p>
                    <p>850</p>
                    <p>PPM</p>
                  </div>
                </div>
                {isSelectedNutrisi ? (
                  <div>
                    <p className="text-sm">
                      Kebutuhan nutrisi diatur secara otomatis
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row justify-center items-center gap-4 text-sm">
                    <Input
                      color="default"
                      type="number"
                      label="Atur Jumlah Nutrisi"
                      size="sm"
                    />
                    <Button
                      variant="flat"
                      color="default"
                      radius="sm"
                      size="lg"
                      className="text-sm"
                    >
                      Perbarui
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div
              id="ph"
              className="bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol pH Air
              </p>
              <p className="text-sm">Atur pH air secara manual atau otomatis</p>
              <div className="pt-3">
                <p className="text-sm">Kapasitas pH Up: 5 Liter</p>
                <p className="text-sm">Kapasitas pH Down: 3 Liter</p>
              </div>
              <div className="w-11/12 grid grid-rows-1 grid-cols-1 justify-center items-center gap-4 text-sm pt-4">
                <div className="flex flex-col gap-2 bg-green-200 p-2 rounded-lg">
                  <div className="flex flex-row gap-2 justify-start items-center">
                    <Slider
                      isDisabled
                      hideThumb={true}
                      label="pH Air"
                      color="warning"
                      hideValue={true}
                      step={1}
                      maxValue={10}
                      minValue={0}
                      defaultValue={6}
                    />
                    <div className="flex flex-row items-center justify-center">
                      <WaterDropIcon color="warning" />
                      <p className="text-sm">6,37</p>
                    </div>
                  </div>
                  {/* <LoadingButton
                    size="small"
                    onClick={handlePH}
                    loading={loadingPH}
                    loadingIndicator="Proses..."
                    variant="text"
                  >
                    <span>Stabilkan</span>
                  </LoadingButton> */}
                </div>
              </div>
            </div>
            <div
              id="lampu"
              className="bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol Grow LED
              </p>
              <p className="text-sm">
                Atur lampu tanaman secara manual atau otomatis
              </p>
              <div>
                <div className="flex flex-row gap-6 mt-4 mb-4 bg-green-200 p-4 rounded-lg justify-center items-center">
                  <div className="flex flex-row justify-center items-center gap-2 text-sm">
                    <Switch
                      size="sm"
                      isSelected={isSelectedLampu}
                      onValueChange={setIsSelectedLampu}
                      defaultSelected
                      color="success"
                    >
                      {isSelectedLampu ? "Otomatis" : "Manual"}
                    </Switch>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-1 text-sm bg-green-300 p-2 rounded-lg">
                    <p>Kondisi:</p>
                    {isSelectedLampu ? <p>Menyala</p> : <p>-</p>}
                  </div>
                </div>
                {isSelectedLampu ? (
                  <div>
                    <p className="text-sm">Lampu diatur secara otomatis</p>
                  </div>
                ) : (
                  <div className="flex flex-row justify-center items-center gap-6 text-sm ">
                    <Switch size="sm" color="primary">
                      Lampu Grow LED
                    </Switch>
                  </div>
                )}
              </div>
            </div>
            <div
              id="ai"
              className="bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol Hama
              </p>
              <p className="text-sm">Atur model secara manual atau otomatis</p>
              <div className="pt-3">
                <p className="text-sm">Kapasitas Pestisida: 2 Liter</p>
              </div>
              <div>
                <div className="flex flex-row gap-6 mt-4 mb-4 bg-green-200 p-4 rounded-lg justify-center items-center">
                  <div className="flex flex-row justify-center items-center gap-2 text-sm">
                    <Switch
                      size="sm"
                      isSelected={isSelectedAI}
                      onValueChange={setIsSelectedAI}
                      defaultSelected
                      color="success"
                    >
                      {isSelectedAI ? "AI" : "Manual"}
                    </Switch>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-1 text-sm bg-green-300 p-2 rounded-lg">
                    <p>Status:</p>
                    {isSelectedAI ? <p>{statusHama}</p> : <p>-</p>}
                  </div>
                </div>
                {isSelectedAI ? (
                  <div>
                    <p className="text-sm pb-3">
                      Model AI Pendeteksi Hama Aktif
                    </p>
                    <Button
                      onPress={onOpen}
                      size="sm"
                      color="primary"
                      variant="flat"
                    >
                      Pantau Hama
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col justify-center items-center text-sm">
                      <p className="text-sm pb-3">
                        Model AI Pendeteksi Hama Tidak Aktif
                      </p>
                      <Switch size="sm" color="primary" className="pb-3">
                        Pompa Pestisida
                      </Switch>
                    </div>
                    <div>
                      <Button
                        onPress={onOpen}
                        size="sm"
                        color="primary"
                        variant="flat"
                      >
                        Kamera Pengintai
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Modal
              isOpen={isOpen}
              placement="center"
              backdrop="blur"
              onOpenChange={onOpenChange}
              size="xl"
              className="mr-4 ml-4"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      {isSelectedAI && isPreviewAI
                        ? "Pantau Hama Tanaman"
                        : "Pantau Kamera Pengintai"}
                    </ModalHeader>
                    <ModalBody>
                      <div className="relative flex justify-center items-center">
                        {isSelectedAI && isPreviewAI ? (
                          <>
                            {photoHama ? (
                              <>
                                <Chip
                                  startContent={
                                    <Image
                                      src={RedIcon}
                                      alt="Red Icon"
                                      width={8}
                                      height={8}
                                    />
                                  }
                                  color="danger"
                                  variant="dot"
                                  size="sm"
                                  className="absolute top-4 right-4 z-10 bg-white opacity-50 pl-2"
                                >
                                  <p className="pl-1">Live</p>
                                </Chip>
                                <div className="flex flex-col">
                                  <Image
                                    width={1920}
                                    height={640}
                                    src={photoHama}
                                    alt="Pantau Hama Tanaman"
                                    className="rounded-lg"
                                  />
                                  <div className="pt-2 text-xs flex flex-row">
                                    <p className="font-semibold pr-1">
                                      Update Terakhir:
                                    </p>
                                    <p>{timestamp}</p>
                                  </div>
                                  <div className="text-xs flex flex-row">
                                    <p className="font-semibold pr-1">
                                      Status Hama:
                                    </p>
                                    <p>{statusHama}</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col justify-center items-center gap-1 pt-6 pb-6">
                                <WarningIcon
                                  color="warning"
                                  fontSize="medium"
                                />
                                <p className="text-sm">
                                  Kamera Pantau Hama Tanaman Tidak Aktif!
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {imageUrl ? (
                              <>
                                <Chip
                                  startContent={
                                    <Image
                                      src={RedIcon}
                                      alt="Red Icon"
                                      width={8}
                                      height={8}
                                    />
                                  }
                                  color="danger"
                                  variant="dot"
                                  size="sm"
                                  className="absolute top-4 right-4 z-10 bg-white opacity-50 pl-2"
                                >
                                  <p className="pl-1">Live</p>
                                </Chip>
                                <div className="flex flex-col">
                                  <Image
                                    width={640}
                                    height={640}
                                    src={imageUrl}
                                    alt="Pantau Kamera Pengintai"
                                    className="rounded-lg"
                                  />
                                  <div className="pt-2 text-xs flex flex-row">
                                    <p className="font-semibold pr-1">
                                      Update Terakhir:
                                    </p>
                                    <p>{timestamp}</p>
                                  </div>
                                  {isSelectedAI ? (
                                    <div className="text-xs flex flex-row">
                                      <p className="font-semibold pr-1">
                                        Status Hama:{" "}
                                      </p>
                                      <p>-</p>
                                    </div>
                                  ) : null}
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col justify-center items-center gap-1 pt-6 pb-6">
                                <WarningIcon
                                  color="warning"
                                  fontSize="medium"
                                />
                                <p className="text-sm">Kamera Tidak Aktif!</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      {isSelectedAI ? (
                        <div className="flex flex-row items-center pr-2">
                          <p className="text-sm">Komparasi</p>
                          <Switch
                            className="pl-2"
                            size="sm"
                            isSelected={isPreviewAI}
                            onValueChange={setIsPreviewAI}
                            defaultSelected
                            color="success"
                          ></Switch>
                        </div>
                      ) : null}
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Tutup
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </>
      ) : (
        <div className="flex flex-col min-h-screen p-4 justify-center items-center gap-2">
          <Typography className="text-center">
            Anda tidak memiliki akses, silahkan masuk terlebih dahulu!
          </Typography>
          <AuthenticationForm />
        </div>
      )}
    </main>
  );
}
