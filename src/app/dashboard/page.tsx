"use client";
import * as React from "react";
import { Typography } from "@mui/material";
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
  Tooltip,
  // Image,
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
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import AuthenticationForm from "../../components/AuthenticationForm";
import Image from "next/image";
import MemoryIcon from "@mui/icons-material/Memory";
import RedIcon from "../../assets/images/components/red-circle.gif";
import AlertCheckAuth from "@/components/AlertCheckAuth";
import AlertLoginGuest from "@/components/AlertLoginGuest";
import AlertAuthorizedMember from "@/components/AlertAuthorizedMember";
import SpedoNutrisi from "@/components/SpedoNutrisi";
import SpedoPH from "@/components/SpedoPH";
import ListTanaman from "@/components/ListTanaman";
import WarningIcon from "@mui/icons-material/Warning";
import LineChartSuhu from "@/components/LineChartSuhu";
import CameraIcon from "@mui/icons-material/Camera";
import ComputerIcon from "@mui/icons-material/Computer";
import { database } from "../../../firebaseConfig";
import SpedoAirHidroponik from "@/components/SpedoAirHidroponik";
import SpedoNutrisiA from "@/components/SpedoNutrisiA";
import SpedoNutrisiB from "@/components/SpedoNutrisiB";
import SpedoPHUp from "@/components/SpedoPHUp";
import SpedoPHDown from "@/components/SpedoPHDown";
import SpedoPestisida from "@/components/SpedoPestisida";
import LampON from "@/assets/images/components/lamp-on.png";
import LampOFF from "@/assets/images/components/lamp-off.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloudIcon from "@mui/icons-material/Cloud";

export default function Dashboard() {
  const user = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSelectedManualOtomatis, setIsSelectedManualOtomatis] =
    React.useState(true);
  const [isSelectedAI, setIsSelectedAI] = React.useState(true);
  const [isPreviewAI, setIsPreviewAI] = React.useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [photoHama, setPhotoHama] = useState("");
  const [statusHama, setStatusHama] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [statusESP32Info, setStatusESP32Info] = useState<string | null>(null);
  const [ssidESP32Info, setSSIDESP32Info] = useState<string | null>(null);
  const [ipAddressESP32Info, setIpAddressESP32Info] = useState<string | null>(
    null
  );
  const [statusESP32Controls, setStatusESP32Controls] = useState<string | null>(
    null
  );
  const [ssidESP32Controls, setSSIDESP32Controls] = useState<string | null>(
    null
  );
  const [ipAddressESP32Controls, setIpAddressESP32Controls] = useState<
    string | null
  >(null);
  const [statusESP32CAM, setStatusESP32CAM] = useState<string | null>(null);
  const [ssidESP32CAM, setSSIDESP32CAM] = useState<string | null>(null);
  const [ipAddressESP32CAM, setIpAddressESP32CAM] = useState<string | null>(
    null
  );
  const [statusVPS, setStatusVPS] = useState<string | null>(null);
  const [webServerVPS, setWebServerVPS] = useState<string | null>(null);
  const [domainVPS, setDomainVPS] = useState<string | null>(null);
  const [lastUpdateTimeESP32Info, setLastUpdateTimeESP32Info] =
    useState<number>(Date.now());
  const [lastUpdateTimeESP32Controls, setLastUpdateTimeESP32Controls] =
    useState<number>(Date.now());
  const [lastUpdateTimeESP32CAM, setLastUpdateTimeESP32CAM] = useState<number>(
    Date.now()
  );

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

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "esp32info");

    const unsubscribe = onValue(dataRef, async (snapshot) => {
      const deletePromises: Promise<void>[] = [];
      let dataDitemukan = false;

      snapshot.forEach((dateSnapshot) => {
        const dateKey = dateSnapshot.key; // Mengambil kunci tanggal
        // console.log(`Memeriksa data dengan tanggal: ${dateKey}`); // Log untuk debugging

        if (dateKey && dateKey.startsWith("2036")) {
          dataDitemukan = true;
          // console.log(
          //   `Menghapus data dengan tahun 2036 untuk tanggal: ${dateKey}`
          // );
          const deletePromise = remove(ref(db, `esp32info/${dateKey}`))
            .then(() => {
              // console.log(`Data dengan tanggal ${dateKey} berhasil dihapus`);
            })
            .catch((error) => {
              // console.error("Terjadi kesalahan saat menghapus data:", error);
            });
          deletePromises.push(deletePromise);
        }
      });

      if (dataDitemukan) {
        try {
          await Promise.all(deletePromises);
          // console.log("Semua data dengan tahun 2036 telah dihapus");
        } catch (error) {
          // console.error("Kesalahan saat proses penghapusan:", error);
        }
      } else {
        // console.log("Tidak ada data dengan tahun 2036 yang ditemukan");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const checkAndInitializeData = (refPath: string, defaultData: object) => {
      const dataRef = ref(database, refPath);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data === null) {
          console.log(
            `Data tidak ditemukan di ${refPath}, menulis data default`
          );
          set(dataRef, defaultData)
            .then(() =>
              console.log(`Data default berhasil ditulis ke ${refPath}`)
            )
            .catch((error) =>
              console.error(
                `Kesalahan saat menulis data default ke ${refPath}:`,
                error
              )
            );
        }
      });
    };

    // Inisialisasi data untuk ESP32 Info
    checkAndInitializeData("settings/mikrokontroler/esp32info", {
      status: "1",
      ssid: "Smart Green Garden",
      ipaddress: "192.168.1.1",
    });

    // Inisialisasi data untuk ESP32 Controls
    checkAndInitializeData("settings/mikrokontroler/esp32controls", {
      status: "1",
      ssid: "Smart Green Garden",
      ipaddress: "192.168.1.2",
    });

    // Inisialisasi data untuk ESP32 CAM
    checkAndInitializeData("settings/mikrokontroler/esp32cam", {
      status: "1",
      ssid: "Smart Green Garden",
      ipaddress: "192.168.1.3",
    });

    // Inisialisasi data untuk VPS
    checkAndInitializeData("settings/server/vps", {
      status: "1",
      domain: "dev.smartgreenovation.com",
      webserver: "Nginx",
    });
  }, []);

  useEffect(() => {
    const esp32InfoRef = ref(database, "settings/mikrokontroler/esp32info");
    onValue(esp32InfoRef, (snapshot) => {
      const data = snapshot.val();
      setStatusESP32Info(data?.status ?? null);
      setSSIDESP32Info(data?.ssid ?? null);
      setIpAddressESP32Info(data?.ipaddress ?? null);
    });

    const esp32ControlsRef = ref(
      database,
      "settings/mikrokontroler/esp32controls"
    );
    onValue(esp32ControlsRef, (snapshot) => {
      const data = snapshot.val();
      setStatusESP32Controls(data?.status ?? null);
      setSSIDESP32Controls(data?.ssid ?? null);
      setIpAddressESP32Controls(data?.ipaddress ?? null);
    });

    const esp32camRef = ref(database, "settings/mikrokontroler/esp32cam");
    onValue(esp32camRef, (snapshot) => {
      const data = snapshot.val();
      setStatusESP32CAM(data?.status ?? null);
      setSSIDESP32CAM(data?.ssid ?? null);
      setIpAddressESP32CAM(data?.ipaddress ?? null);
    });

    const vpsRef = ref(database, "settings/server/vps");
    onValue(vpsRef, (snapshot) => {
      const data = snapshot.val();
      setStatusVPS(data?.status ?? null);
      setDomainVPS(data?.domain ?? null);
      setWebServerVPS(data?.webserver ?? null);
    });
  }, []);

  const [kapasitasTandonPencampuran, setKapasitasTandonPencampuran] = useState<
    string | null
  >(null);
  const [kapasitasNutrisiA, setKapasitasNutrisiA] = useState<string | null>(
    null
  );
  const [kapasitasNutrisiB, setKapasitasNutrisiB] = useState<string | null>(
    null
  );
  const [sensorTDS, setSensorTDS] = useState<string | null>(null);
  const [sensorPH, setSensorPH] = useState<string | null>(null);
  const [sensorSuhuAir, setSensorSuhuAir] = useState<string | null>(null);
  const [sensorSuhuUdara, setSensorSuhuUdara] = useState<string | null>(null);
  const [sensorKelembapanUdara, setSensorKelembapanUdara] = useState<
    string | null
  >(null);
  const [kapasitasPHUp, setKapasitasPHUp] = useState<string | null>(null);
  const [kapasitasPHDown, setKapasitasPHDown] = useState<string | null>(null);
  const [kapasitasPestisida, setKapasitasPestisida] = useState<string | null>(
    null
  );

  useEffect(() => {
    const esp32InfoRef = ref(database, "esp32info");
    const latestQuery = query(esp32InfoRef, limitToLast(1));
    onValue(latestQuery, (latestSnapshot) => {
      latestSnapshot.forEach((latestDateSnapshot) => {
        latestDateSnapshot.forEach((latestTimeSnapshot) => {
          const latestData = latestTimeSnapshot.val();
          const latestKapasitasTandonPencampuran =
            latestData.kapasitas_tandon_pencampuran;
          const latestKapasitasNutrisiA = latestData.kapasitas_nutrisi_a;
          const latestKapasitasNutrisiB = latestData.kapasitas_nutrisi_b;
          const latestSensorTDS = latestData.sensor_tds;
          const latestSensorPH = latestData.sensor_ph;
          const latestKapasitasPHUp = latestData.kapasitas_ph_up;
          const latestKapasitasPHDown = latestData.kapasitas_ph_down;
          const latestKapasitasPestisida = latestData.kapasitas_pestisida;
          const latestSensorSuhuAir = latestData.sensor_suhu_air;
          const latestSensorSuhuUdara = latestData.sensor_suhu_udara;
          const latestSensorKelembapanUdara =
            latestData.sensor_kelembaban_udara;
          if (latestKapasitasTandonPencampuran) {
            setKapasitasTandonPencampuran(latestKapasitasTandonPencampuran);
          }
          if (latestKapasitasNutrisiA) {
            setKapasitasNutrisiA(latestKapasitasNutrisiA);
          }
          if (latestKapasitasNutrisiB) {
            setKapasitasNutrisiB(latestKapasitasNutrisiB);
          }
          if (latestKapasitasPHUp) {
            setKapasitasPHUp(latestKapasitasPHUp);
          }
          if (latestKapasitasPHDown) {
            setKapasitasPHDown(latestKapasitasPHDown);
          }
          if (latestKapasitasPestisida) {
            setKapasitasPestisida(latestKapasitasPestisida);
          }
          if (latestSensorTDS) {
            const parsedSensorTDS: string | null =
              latestSensorTDS !== null
                ? String(parseFloat(latestSensorTDS).toFixed(1))
                : null;
            setSensorTDS(parsedSensorTDS);
          }
          if (latestSensorPH) {
            const parsedSensorPH: string | null =
              latestSensorPH !== null
                ? String(parseFloat(latestSensorPH).toFixed(1))
                : null;
            setSensorPH(parsedSensorPH);
          }
          if (latestSensorSuhuAir) {
            const parsedSensorSuhuAirFloat: string | null =
              latestSensorSuhuAir !== null
                ? String(parseFloat(latestSensorSuhuAir).toFixed(1))
                : null;
            setSensorSuhuAir(parsedSensorSuhuAirFloat);
          }
          if (latestSensorSuhuUdara) {
            const parsedSensorSuhuUdaraFloat: string | null =
              latestSensorSuhuUdara !== null
                ? String(parseFloat(latestSensorSuhuUdara).toFixed(1))
                : null;
            const sensorSuhuUdaraValue =
              parsedSensorSuhuUdaraFloat === "NaN"
                ? "0"
                : parsedSensorSuhuUdaraFloat;
            setSensorSuhuUdara(sensorSuhuUdaraValue);
          }
          if (latestSensorKelembapanUdara) {
            let parsedSensorKelembapanUdaraFloat: string | null =
              latestSensorKelembapanUdara !== null
                ? String(parseFloat(latestSensorKelembapanUdara).toFixed(1))
                : null;
            if (parsedSensorKelembapanUdaraFloat === "NaN") {
              parsedSensorKelembapanUdaraFloat = "0";
            }
            setSensorKelembapanUdara(parsedSensorKelembapanUdaraFloat);
          }
        });
      });
    });
  }, []);

  const [controlsAction, setControlsAction] = useState<number | undefined>(
    undefined
  );
  const [controlDinamoPengaduk, setControlDinamoPengaduk] = useState<
    number | undefined
  >(undefined);
  const [controlNutrisiAB, setControlNutrisiAB] = useState<number | undefined>(
    undefined
  );
  const [controlPengurasanPipa, setControlPengurasanPipa] = useState<
    number | undefined
  >(undefined);
  const [controlPHDown, setControlPHDown] = useState<number | undefined>(
    undefined
  );
  const [controlPHUp, setControlPHUp] = useState<number | undefined>(undefined);
  const [controlPompaIrigasi, setControlPompaIrigasi] = useState<
    number | undefined
  >(undefined);
  const [controlPompaPestisida, setControlPompaPestisida] = useState<
    number | undefined
  >(undefined);
  const [controlSumberAir, setControlSumberAir] = useState<number | undefined>(
    undefined
  );
  const [controlGrowLight, setControlGrowLight] = useState<number | undefined>(
    undefined
  );
  const [relayValuesChanged, setRelayValuesChanged] = useState(false);

  useEffect(() => {
    const esp32controlsRef = ref(database, "esp32controls");
    onValue(esp32controlsRef, (snapshot) => {
      const data = snapshot.val();
      setControlsAction(data.controls_action);
      setControlDinamoPengaduk(data.relay_dinamo_pengaduk);
      setControlNutrisiAB(data.relay_nutrisi_ab);
      setControlPengurasanPipa(data.relay_pengurasan_pipa);
      setControlPHDown(data.relay_ph_down);
      setControlPHUp(data.relay_ph_up);
      setControlPompaIrigasi(data.relay_pompa_irigasi);
      setControlPompaPestisida(data.relay_pompa_pestisida);
      setControlSumberAir(data.relay_sumber_air);
      setControlGrowLight(data.relay_grow_light);

      // Gabungkan data relay
      const relayData = [
        data.relay_pengurasan_pipa,
        data.relay_pompa_irigasi,
        data.relay_dinamo_pengaduk,
        data.relay_nutrisi_ab,
        data.relay_ph_up,
        data.relay_ph_down,
        data.relay_pompa_pestisida,
        data.relay_sumber_air,
        data.relay_grow_light,
      ].join(",");

      // Update relay_data di Firebase
      set(ref(database, "esp32controls/relay_data"), relayData);
    });
  }, []);

  const handleSwitchControlsActionChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;

    // Update controls_action in Firebase
    set(ref(database, "esp32controls/controls_action"), newControlValue)
      .then(() => {
        setControlsAction(newControlValue);

        // Check if controls_action is set to 1 for the first time
        if (newControlValue === 1 && !relayValuesChanged) {
          const relayUpdates = {
            relay_dinamo_pengaduk: 0,
            relay_nutrisi_ab: 0,
            relay_pengurasan_pipa: 0,
            relay_ph_down: 0,
            relay_ph_up: 0,
            relay_pompa_irigasi: 0,
            relay_pompa_pestisida: 0,
            relay_sumber_air: 0,
            relay_grow_light: 0,
          };

          const controlsActionRef = ref(database, "esp32controls");
          update(controlsActionRef, relayUpdates)
            .then(() => {
              setRelayValuesChanged(true);
              console.log("Relay values updated successfully");
            })
            .catch((error) => {
              console.error("Error updating relay values:", error);
            });
        } else if (newControlValue === 0) {
          // Reset relay values only if they have been changed before
          if (relayValuesChanged) {
            const relayUpdates = {
              relay_dinamo_pengaduk: 0,
              relay_nutrisi_ab: 0,
              relay_pengurasan_pipa: 0,
              relay_ph_down: 0,
              relay_ph_up: 0,
              relay_pompa_irigasi: 0,
              relay_pompa_pestisida: 0,
              relay_sumber_air: 0,
              relay_grow_light: 0,
            };

            const controlsActionRef = ref(database, "esp32controls");
            update(controlsActionRef, relayUpdates)
              .then(() => {
                setRelayValuesChanged(false);
                console.log("Relay values reset successfully");
              })
              .catch((error) => {
                console.error("Error resetting relay values:", error);
              });
          }
        }
      })
      .catch((error) => {
        console.error("Error updating controls_action:", error);
      });
  };

  const handleSwitchDinamoPengadukChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;
    set(ref(database, "esp32controls/relay_dinamo_pengaduk"), newControlValue);
    setControlDinamoPengaduk(newControlValue);
  };

  const handleSwitchNutrisiABChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;
    set(ref(database, "esp32controls/relay_nutrisi_ab"), newControlValue);
    setControlNutrisiAB(newControlValue);
  };

  const handleSwitchPengurasanPipaChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;
    set(ref(database, "esp32controls/relay_pengurasan_pipa"), newControlValue);
    setControlPengurasanPipa(newControlValue);
  };

  const handleSwitchPHDownChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;
    set(ref(database, "esp32controls/relay_ph_down"), newControlValue);
    setControlPHDown(newControlValue);
  };

  const handleSwitchPHUpChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;
    set(ref(database, "esp32controls/relay_ph_up"), newControlValue);
    setControlPHUp(newControlValue);
  };

  const handleSwitchPompaIrigasiChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;
    set(ref(database, "esp32controls/relay_pompa_irigasi"), newControlValue);
    setControlPompaIrigasi(newControlValue);
  };

  const handleSwitchPompaPestisidaChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;
    set(ref(database, "esp32controls/relay_pompa_pestisida"), newControlValue);
    setControlPompaPestisida(newControlValue);
  };

  const handleSwitchSumberAirChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;
    set(ref(database, "esp32controls/relay_sumber_air"), newControlValue);
    setControlSumberAir(newControlValue);
  };

  const handleSwitchGrowLightChange = (newValue: boolean) => {
    const newControlValue = newValue ? 1 : 0;
    set(ref(database, "esp32controls/relay_grow_light"), newControlValue);
    setControlGrowLight(newControlValue);
  };

  const overallStatusESP32 =
    statusESP32Info && statusESP32Controls
      ? "Hidup"
      : statusESP32Info || statusESP32Controls
      ? "Bermasalah"
      : "Mati";

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
            <Tooltip
              showArrow={true}
              size="sm"
              content="Maaf, Fitur belum tersedia."
              color="danger"
            >
              <div className="mt-1 p-2 flex flex-wrap gap-3 justify-center items-center rounded-xl">
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>
                    <Chip
                      isDisabled
                      startContent={<MemoryIcon fontSize="small" />}
                      variant="faded"
                      color="primary"
                      size="lg"
                      className="cursor-pointer"
                    >
                      {overallStatusESP32}
                    </Chip>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold pb-2">
                        Mikrokontroller ESP32
                      </div>
                      <div className="flex flex-col justify-start items-start gap-1">
                        <div>
                          <div className="text-tiny font-bold">
                            Kondisi ESP32 Info
                          </div>
                          <div className="text-tiny">SSID: {ssidESP32Info}</div>
                          <div className="text-tiny">
                            IP Address: <a href="">{ipAddressESP32Info}</a>
                          </div>
                          <div className="text-tiny">
                            Status: {statusESP32Info ? "Hidup" : "Mati"}
                          </div>
                        </div>
                        <div>
                          <div className="text-tiny font-bold">
                            Kondisi ESP32 Controls
                          </div>
                          <div className="text-tiny">
                            SSID: {ssidESP32Controls}
                          </div>
                          <div className="text-tiny">
                            IP Address: <a href="">{ipAddressESP32Controls}</a>
                          </div>
                          <div className="text-tiny">
                            Status: {statusESP32Controls ? "Hidup" : "Mati"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>
                    <Chip
                      isDisabled
                      startContent={<CameraIcon fontSize="small" />}
                      variant="faded"
                      color="primary"
                      size="lg"
                      className="cursor-pointer"
                    >
                      {statusESP32CAM ? "Hidup" : "Mati"}
                    </Chip>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold pb-2">
                        Mikrokontroller ESP32CAM
                      </div>
                      <div className="flex flex-col justify-start items-start gap-1">
                        <div>
                          <div className="text-tiny font-bold">
                            Kondisi ESP32CAM
                          </div>
                          <div className="text-tiny">SSID: {ssidESP32CAM}</div>
                          <div className="text-tiny">
                            IP Address: <a href="">{ipAddressESP32CAM}</a>
                          </div>
                          <div className="text-tiny">
                            Status: {statusESP32CAM ? "Hidup" : "Mati"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>
                    <Chip
                      isDisabled
                      startContent={<ComputerIcon fontSize="small" />}
                      variant="faded"
                      color="primary"
                      size="lg"
                      className="cursor-pointer"
                    >
                      {statusVPS ? "Hidup" : "Mati"}
                    </Chip>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold pb-2">Server</div>
                      <div className="flex flex-col justify-start items-start gap-1">
                        <div>
                          <div className="text-tiny font-bold">Kondisi VPS</div>
                          <div className="text-tiny">
                            Web Server:{" "}
                            <a target="_blank" href="https://nginx.org/">
                              {webServerVPS}
                            </a>
                          </div>
                          <div className="text-tiny">
                            Domain:{" "}
                            <a
                              target="_blank"
                              href="http://dev.smartgreenovation.com"
                            >
                              {domainVPS}
                            </a>
                          </div>
                          <div className="text-tiny">
                            Status: {statusVPS ? "Hidup" : "Mati"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </Tooltip>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 justify-center items-center gap-4 w-11/12 sm:w-4/6 md:w-4/6 lg:w-4/6 xl:w-4/6 mx-auto outline outline-slate-200 rounded-lg p-4">
              <LineChartSuhu />
              <div>
                <div className="relative flex justify-center items-center">
                  {controlsAction && isPreviewAI ? (
                    <>
                      {photoHama ? (
                        <>
                          <Chip
                            startContent={
                              <Image
                                src={RedIcon.src}
                                alt="Red Icon"
                                width={8}
                                height={8}
                              />
                            }
                            color="danger"
                            variant="dot"
                            size="sm"
                            className="absolute top-4 right-4 z-20 bg-white opacity-50 pl-2"
                          >
                            <p className="pl-1">
                              {controlsAction && isPreviewAI
                                ? "Pantau Hama Tanaman"
                                : "Pantau Kamera Pengintai"}
                            </p>
                          </Chip>
                          <div className="flex flex-col justify-center items-center">
                            <Image
                              width={640}
                              height={480}
                              src={photoHama}
                              alt="Pantau Hama Tanaman"
                              className="rounded-lg"
                            />
                            <div className="flex flex-col sm:flex-row justify-between w-full">
                              <div>
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
                              <div>
                                {controlsAction === 1 ? (
                                  <div className="flex flex-row items-center justify-center mx-auto p-1 rounded-lg mt-2">
                                    <Switch
                                      className="-mr-2"
                                      size="sm"
                                      isSelected={isPreviewAI}
                                      onValueChange={setIsPreviewAI}
                                      defaultSelected
                                      color="success"
                                    ></Switch>
                                    <p className="text-sm pl-2">Komparasi</p>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col justify-center items-center gap-1 pt-6 pb-6">
                          <WarningIcon color="warning" fontSize="medium" />
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
                                src={RedIcon.src}
                                alt="Red Icon"
                                width={8}
                                height={8}
                              />
                            }
                            color="danger"
                            variant="dot"
                            size="sm"
                            className="absolute top-4 right-4 z-20 bg-white opacity-50 pl-2"
                          >
                            <p className="pl-1">
                              {controlsAction && isPreviewAI
                                ? "Pantau Hama Tanaman"
                                : "Pantau Kamera Pengintai"}
                            </p>
                          </Chip>
                          <div className="flex flex-col justify-center items-center">
                            <Image
                              width={640}
                              height={480}
                              src={imageUrl}
                              alt="Pantau Kamera Pengintai"
                              className="rounded-lg"
                            />
                            <div className="flex flex-col sm:flex-row justify-between w-full">
                              <div>
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
                                  <p>-</p>
                                </div>
                              </div>
                              <div>
                                {controlsAction === 1 ? (
                                  <div className="flex flex-row items-center justify-center mx-auto p-1 rounded-lg mt-2">
                                    <Switch
                                      className="-mr-2"
                                      size="sm"
                                      isSelected={isPreviewAI}
                                      onValueChange={setIsPreviewAI}
                                      defaultSelected
                                      color="success"
                                    ></Switch>
                                    <p className="text-sm pl-2">Komparasi</p>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col justify-center items-center gap-1 pt-6 pb-6">
                          <WarningIcon color="warning" fontSize="medium" />
                          <p className="text-sm">Kamera Tidak Aktif!</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <Tooltip
              showArrow={true}
              size="sm"
              content="Maaf, Fitur mode otomatis tidak berfungsi. Silahkan gunakan mode manual!"
              color="danger"
            >
              {user.role === "member" ? null : (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-11/12 sm:w-4/6 md:w-4/6 lg:w-4/6 xl:w-4/6 mx-auto">
                  <div className="flex flex-col gap-2 mt-2 mb-2 bg-green-200 p-4 rounded-lg justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-1 text-sm">
                      <Switch
                        isDisabled
                        size="sm"
                        isSelected={controlsAction === 1}
                        onValueChange={handleSwitchControlsActionChange}
                        color="success"
                      >
                        {controlsAction === 1 ? "Otomatis" : "Manual"}
                      </Switch>
                      {controlsAction === 1 ? (
                        <p className="text-sm text-center">
                          Sistem Hidroponik Diproses Otomatis
                        </p>
                      ) : (
                        <p className="text-sm text-center">
                          Sistem Hidroponik Diproses Manual
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Tooltip>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-11/12 sm:w-4/6 md:w-4/6 lg:w-4/6 xl:w-4/6 mx-auto">
              <ListTanaman />
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 grid-rows-6 gap-6 sm:grid-cols-3 sm:grid-rows-2 sm:gap-6 md:grid-cols-3 md:grid-rows-2 md:gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6 xl:grid-cols-3 xl:grid-rows-2 xl:gap-6">
            <div
              id="irigasi"
              className="relative bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Sistem Saluran Irigasi Otomatis
              </p>
              <p className="text-sm">
                Atur saluran irigasi secara manual atau otomatis
              </p>
              <div className="mt-3 -mb-3">
                <SpedoAirHidroponik />
              </div>
              {user.role === "member" ? null : (
                <div>
                  {controlsAction === 1 ? (
                    <div>
                      <p className="text-sm">
                        Kebutuhan air diatur secara otomatis
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 grid-rows-2 justify-center items-center gap-2 text-sm text-left">
                      <div className="grid grid-cols-2 grid-rows-1 justify-start text-left">
                        <Switch
                          isSelected={controlSumberAir === 1}
                          onValueChange={handleSwitchSumberAirChange}
                          size="sm"
                          color="primary"
                        >
                          Sumber Air
                        </Switch>
                        <Switch
                          isSelected={controlPengurasanPipa === 1}
                          onValueChange={handleSwitchPengurasanPipaChange}
                          size="sm"
                          color="primary"
                        >
                          Pengurasan Pipa
                        </Switch>
                      </div>
                      <div className="grid grid-cols-2 grid-rows-1 justify-start text-left">
                        <Switch
                          isSelected={controlPompaIrigasi === 1}
                          onValueChange={handleSwitchPompaIrigasiChange}
                          size="sm"
                          color="primary"
                        >
                          Pompa Irigasi
                        </Switch>
                        <Switch
                          isSelected={controlDinamoPengaduk === 1}
                          onValueChange={handleSwitchDinamoPengadukChange}
                          size="sm"
                          color="primary"
                        >
                          Pengaduk Air
                        </Switch>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="absolute top-4 right-4 z-10 cursor-pointer">
                <Popover placement="left-start" showArrow={true}>
                  <PopoverTrigger>
                    <InfoOutlinedIcon color="disabled" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col justify-start">
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">
                          Standar Parameter
                        </div>
                        <div className="text-tiny">
                          Kapasitas Full: 150 Liter
                        </div>
                      </div>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">
                          Informasi Sensor
                        </div>
                        <div className="text-tiny">
                          Sensor Ultrasonik Tandon Hidroponik:{" "}
                          {kapasitasTandonPencampuran}
                          {"cm"}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div
              id="nutrisi"
              className="relative bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol Nutrisi
              </p>
              <p className="text-sm">
                Atur nutrisi tanaman secara manual atau otomatis
              </p>
              <div>
                <div className="flex flex-col justify-center items-center gap-1 text-sm mt-3 mb-3">
                  <div className="flex flex-row justify-center items-center -mb-6">
                    <SpedoNutrisiA />
                    <SpedoNutrisiB />
                  </div>
                  <div className="flex flex-col gap-2 bg-green-200 p-2 rounded-lg sm:w-full w-11/12">
                    <div className="flex flex-row gap-2 justify-start items-center">
                      <Slider
                        isDisabled
                        hideThumb={true}
                        label="Nutrisi Tanaman"
                        color="primary"
                        hideValue={true}
                        step={1}
                        maxValue={1000}
                        minValue={0}
                        value={
                          sensorTDS !== null ? parseInt(sensorTDS) : undefined
                        }
                      />
                      <div className="flex flex-row items-center justify-center w-full">
                        <WaterDropIcon color="primary" />
                        <p className="text-sm">{sensorTDS} / 1000 PPM</p>
                      </div>
                    </div>
                  </div>
                </div>
                {user.role === "member" ? null : (
                  <>
                    {controlsAction === 1 ? (
                      <div>
                        <p className="text-sm mb-4">
                          Kebutuhan nutrisi diatur secara otomatis
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center gap-4 text-sm mb-8">
                        <div className="grid grid-cols-1 grid-rows-1 justify-start">
                          <Switch
                            isSelected={controlNutrisiAB === 1}
                            onValueChange={handleSwitchNutrisiABChange}
                            size="sm"
                            color="primary"
                          >
                            Nutrisi AB Mix
                          </Switch>
                        </div>
                        <Tooltip
                          showArrow={true}
                          size="sm"
                          content="Maaf, mengatur jumlah nutrisi tidak berfungsi. Silahkan gunakan switch manual!"
                          color="danger"
                        >
                          <div className="flex flex-row justify-center gap-4 items-center">
                            <Input
                              isDisabled
                              color="default"
                              type="number"
                              label="Atur Jumlah Nutrisi (PPM)"
                              size="sm"
                              min={0}
                            />
                            <Button
                              isDisabled
                              variant="flat"
                              color="default"
                              radius="sm"
                              size="lg"
                              className="text-sm"
                            >
                              Perbarui
                            </Button>
                          </div>
                        </Tooltip>
                      </div>
                    )}
                  </>
                )}
                <div className="absolute top-4 right-4 z-10 cursor-pointer">
                  <Popover placement="left-start" showArrow={true}>
                    <PopoverTrigger>
                      <InfoOutlinedIcon color="disabled" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col justify-start">
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">Peringatan</div>
                          <div className="text-tiny">
                            Input jumlah nutrisi tidak berfungsi (Karena
                            terkendala pada proses pengaturan jumlah nutrisi
                            (PPM) di IoT). Silahkan gunakan switch manual!
                          </div>
                        </div>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            Standar Parameter
                          </div>
                          <div className="text-tiny">
                            Nutrisi Semai: {"<"} 500 PPM
                          </div>
                          <div className="text-tiny">
                            Nutrisi Setelah Semai: {">"} 1000 PPM
                          </div>
                        </div>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            Informasi Sensor
                          </div>
                          <div className="text-tiny">
                            Sensor Ultrasonik Nutrisi A: {kapasitasNutrisiA}
                            {"cm"}
                          </div>
                          <div className="text-tiny">
                            Sensor Ultrasonik Nutrisi B: {kapasitasNutrisiB}
                            {"cm"}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div
              id="ph"
              className="relative bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol pH Air
              </p>
              <p className="text-sm  mb-3">
                Atur pH air secara manual atau otomatis
              </p>
              <div className="flex flex-row justify-center items-center -mb-6">
                <SpedoPHUp />
                <SpedoPHDown />
              </div>
              <div className="w-11/12 grid grid-rows-1 grid-cols-1 justify-center items-center gap-4 text-sm pt-1">
                <div className="flex flex-col gap-2 bg-green-200 p-2 rounded-lg">
                  <div className="flex flex-row gap-2 justify-start items-center">
                    <Slider
                      isDisabled
                      hideThumb={true}
                      label="pH Air Hidroponik"
                      color="primary"
                      hideValue={true}
                      step={1}
                      maxValue={10}
                      minValue={0}
                      value={sensorPH !== null ? parseInt(sensorPH) : undefined}
                    />
                    <div className="flex flex-row items-center justify-center w-1/2">
                      <WaterDropIcon color="primary" />
                      <p className="text-sm">{sensorPH} / 10</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {user.role === "member" ? null : (
                  <>
                    {controlsAction === 1 ? (
                      <div>
                        <p className="text-sm pt-3">
                          Kebutuhan pH air diatur secara otomatis
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center gap-4 text-sm pt-3">
                        <div className="grid grid-cols-2 grid-rows-1 justify-start">
                          <Switch
                            isSelected={controlPHUp === 1}
                            onValueChange={handleSwitchPHUpChange}
                            size="sm"
                            color="primary"
                          >
                            pH Up
                          </Switch>
                          <Switch
                            isSelected={controlPHDown === 1}
                            onValueChange={handleSwitchPHDownChange}
                            size="sm"
                            color="primary"
                          >
                            pH Down
                          </Switch>
                        </div>
                        <Tooltip
                          showArrow={true}
                          size="sm"
                          content="Maaf, mengatur jumlah pH tidak berfungsi. Silahkan gunakan switch manual!"
                          color="danger"
                        >
                          <div className="flex flex-row gap-4 justify-center items-center">
                            <Input
                              isDisabled
                              color="default"
                              type="number"
                              label="Atur Jumlah pH Air"
                              size="sm"
                              step={0.1}
                              min={0}
                            />
                            <Button
                              isDisabled
                              variant="flat"
                              color="default"
                              radius="sm"
                              size="lg"
                              className="text-sm"
                            >
                              Perbarui
                            </Button>
                          </div>
                        </Tooltip>
                      </div>
                    )}
                  </>
                )}
                <div className="absolute top-4 right-4 z-10 cursor-pointer">
                  <Popover placement="left-start" showArrow={true}>
                    <PopoverTrigger>
                      <InfoOutlinedIcon color="disabled" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col justify-start">
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">Peringatan</div>
                          <div className="text-tiny">
                            Input jumlah pH tidak berfungsi (Karena terkendala
                            pada proses pengaturan jumlah nutrisi (PPM) di IoT).
                            Silahkan gunakan switch manual!
                          </div>
                        </div>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            Standar Parameter
                          </div>
                          <div className="text-tiny">pH Tanaman: {"<"} 6</div>
                        </div>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            Informasi Sensor
                          </div>
                          <div className="text-tiny">
                            Sensor Ultrasonik pH Up: {kapasitasPHUp}
                            {"cm"}
                          </div>
                          <div className="text-tiny">
                            Sensor Ultrasonik pH Down: {kapasitasPHDown}
                            {"cm"}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div
              id="suhu"
              className="relative bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol Suhu
              </p>
              <p className="text-sm">Kondisi suhu air hidroponik</p>
              <div className="w-11/12 grid grid-rows-1 grid-cols-1 justify-center items-center text-sm pt-4 gap-3">
                <div className="flex flex-row justify-start items-center gap-2 bg-green-200 p-2 rounded-lg">
                  <Slider
                    isDisabled
                    hideThumb={true}
                    label="Kelembapan"
                    color="primary"
                    hideValue={true}
                    maxValue={100}
                    minValue={0}
                    value={
                      sensorKelembapanUdara !== null
                        ? parseInt(sensorKelembapanUdara)
                        : undefined
                    }
                  />
                  <div className="flex flex-row items-center justify-center">
                    <CloudIcon color="primary" />
                    <p className="pl-2 text-sm">{sensorKelembapanUdara}%</p>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-2 bg-green-200 p-2 rounded-lg">
                  <Slider
                    isDisabled
                    hideThumb={true}
                    label="Suhu Udara"
                    color="warning"
                    hideValue={true}
                    maxValue={50}
                    minValue={0}
                    value={
                      sensorSuhuUdara !== null
                        ? parseInt(sensorSuhuUdara)
                        : undefined
                    }
                  />
                  <div className="flex flex-row items-center justify-center">
                    <ThermostatIcon color="warning" />
                    <p className="text-sm">{sensorSuhuUdara}°C</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 bg-green-200 p-2 rounded-lg">
                  <div className="flex flex-row gap-2 justify-start items-center">
                    <Slider
                      isDisabled
                      hideThumb={true}
                      label="Suhu Air"
                      color="primary"
                      hideValue={true}
                      step={1}
                      maxValue={50}
                      minValue={0}
                      value={
                        sensorSuhuAir !== null
                          ? parseInt(sensorSuhuAir)
                          : undefined
                      }
                    />
                    <div className="flex flex-row items-center justify-center">
                      <ThermostatIcon color="primary" />
                      <p className="text-sm">{sensorSuhuAir}°C</p>
                    </div>
                  </div>
                </div>
                {controlsAction === 1 ? (
                  <div>
                    <p className="text-sm">Suhu air diatur secara otomatis</p>
                  </div>
                ) : null}
              </div>
              <div className="absolute top-4 right-4 z-10 cursor-pointer">
                <Popover placement="left-start" showArrow={true}>
                  <PopoverTrigger>
                    <InfoOutlinedIcon color="disabled" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col justify-start">
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">Peringatan</div>
                        <div className="text-tiny">
                          Terkadang kelembapan dan suhu udara tidak berfungsi
                          (Karena terkendala pada proses di IoT).
                        </div>
                      </div>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">
                          Standar Parameter
                        </div>
                        <div className="text-tiny">Suhu Udara: 28°C - 32°C</div>
                        <div className="text-tiny">Suhu Air: 28°C - 30°C</div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div
              id="growlight"
              className="relative bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol Grow Light
              </p>
              <p className="text-sm">
                Atur lampu tanaman secara manual atau otomatis
              </p>
              <div>
                <div className="flex flex-row justify-center items-center gap-1 text-sm p-2 mt-3 mb-3">
                  {controlsAction === 1 ? (
                    <div className="flex flex-col justify-center items-center">
                      <Image
                        width={128}
                        height={128}
                        src={LampON.src}
                        alt="Grow Light"
                      />
                      <p className="text-sm pt-4">
                        Lampu tanaman diatur secara otomatis
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col justify-center items-center text-sm">
                        {controlGrowLight === 1 ? (
                          <Image
                            width={128}
                            height={128}
                            src={LampON.src}
                            alt="Grow Light"
                          />
                        ) : (
                          <Image
                            width={128}
                            height={128}
                            src={LampOFF.src}
                            alt="Grow Light"
                          />
                        )}
                        {user.role === "member" ? null : (
                          <Switch
                            isSelected={controlGrowLight === 1}
                            onValueChange={handleSwitchGrowLightChange}
                            size="sm"
                            color="primary"
                            className="pt-4"
                          >
                            Lampu Grow Light
                          </Switch>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4 z-10 cursor-pointer">
                <Popover placement="left-start" showArrow={true}>
                  <PopoverTrigger>
                    <InfoOutlinedIcon color="disabled" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col justify-start">
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">
                          Standar Parameter
                        </div>
                        <div className="text-tiny">Pagi: Mati</div>
                        <div className="text-tiny">Siang: Mati</div>
                        <div className="text-tiny">Sore: Mati</div>
                        <div className="text-tiny">Malam: Hidup</div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div
              id="ai"
              className="relative bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol Hama
              </p>
              <p className="text-sm">Atur model secara manual atau otomatis</p>
              <div className="pt-3 -mb-6">
                <SpedoPestisida />
              </div>
              <div>
                {controlsAction === 1 ? (
                  <div>
                    <p className="text-sm pb-3">AI pendeteksi hama aktif</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col justify-center items-center text-sm">
                      <p className="text-sm pb-3">
                        AI pendeteksi hama tidak aktif
                      </p>
                      {user.role === "member" ? null : (
                        <Switch
                          isSelected={controlPompaPestisida === 1}
                          onValueChange={handleSwitchPompaPestisidaChange}
                          size="sm"
                          color="primary"
                          className="pb-3"
                        >
                          Pompa Pestisida
                        </Switch>
                      )}
                    </div>
                  </>
                )}
                <div className="absolute top-4 right-4 z-10 cursor-pointer">
                  <Popover placement="left-start" showArrow={true}>
                    <PopoverTrigger>
                      <InfoOutlinedIcon color="disabled" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col justify-start">
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">Peringatan</div>
                          <div className="text-tiny">
                            Terkadang kamera pemantauan hama tidak berfungsi
                            yang disebabkan oleh jaringan. database penyimpanan
                            data penuh, atau bug dari modul ESP32CAM.
                          </div>
                        </div>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            Standar Parameter
                          </div>
                          <div className="text-tiny">
                            Jadwal Penyemprotan: Seminggu 3 kali
                          </div>
                        </div>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            Informasi Sensor
                          </div>
                          <div className="text-tiny">
                            Sensor Ultrasonik Pestisida: {kapasitasPestisida}
                            {"cm"}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
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
