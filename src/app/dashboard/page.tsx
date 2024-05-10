"use client";
import * as React from "react";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "@/middleware/AuthenticationProviders";
import { Button, Input, Slider, Switch } from "@nextui-org/react";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Charts from "../../components/Charts";

export default function Dashboard() {
  const user = useAuth();
  const [loadingSuhu, setLoadingSuhu] = React.useState(false);
  const [loadingPH, setLoadingPH] = React.useState(false);
  const [isSelectedNFTDFT, setIsSelectedNFTDFT] = React.useState(true);
  const [isSelectedManualOtomatis, setIsSelectedManualOtomatis] =
    React.useState(true);
  const [isSelectedNutrisi, setIsSelectedNutrisi] = React.useState(true);
  const [isSelectedLampu, setIsSelectedLampu] = React.useState(true);
  const [isSelectedAI, setIsSelectedAI] = React.useState(true);

  function handleSuhu() {
    setLoadingSuhu(true);
  }
  function handlePH() {
    setLoadingPH(true);
  }

  return (
    <main className="flex flex-col justify-center items-center gap-3 pt-8 pb-8">
      {user ? (
        <>
          <div className="text-center p-4 gap-2">
            <p className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold pb-2">
              Selamat datang di Dashboard, {user ? user.displayName : ""}👋
            </p>
            <p>Jelajahi Sistem Monitoring dan Kontrol Next-Gen Hydroponics</p>
          </div>

          <Charts />

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
                  <div className="flex flex-row justify-center items-center gap-2 text-sm">
                    <Switch
                      size="sm"
                      isSelected={isSelectedNFTDFT}
                      onValueChange={setIsSelectedNFTDFT}
                      defaultSelected
                      color="success"
                    >
                      {isSelectedNFTDFT ? "DFT" : "NFT"}
                    </Switch>
                  </div>
                </div>
                {isSelectedManualOtomatis ? (
                  <div>
                    <p className="text-sm">Air dikendalikan secara otomatis</p>
                  </div>
                ) : (
                  <div className="flex flex-row justify-center items-center gap-6 text-sm ">
                    <Switch size="sm" color="primary">
                      Sumber Air
                    </Switch>
                    <Switch size="sm" color="primary">
                      Saluran Irigasi
                    </Switch>
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
              <p className="text-sm">Kondisi suhu udara dan air hidroponik</p>
              <div className="w-11/12 grid grid-rows-2 grid-cols-1 justify-center items-center gap-4 text-sm pt-4">
                <div className="flex flex-row justify-start items-center gap-2 bg-green-200 p-2 rounded-lg">
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
                </div>
                <div className="flex flex-row justify-start items-center gap-2 bg-green-200 p-2 rounded-lg">
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
                <LoadingButton
                  size="small"
                  onClick={handleSuhu}
                  loading={loadingSuhu}
                  loadingIndicator="Proses..."
                  variant="text"
                  className=""
                >
                  <span>Segarkan</span>
                </LoadingButton>
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
              <div>
                <div className="flex flex-row gap-6 mt-4 mb-4 bg-green-200 p-4 rounded-lg justify-center items-center">
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
                      Nutrisi dikendalikan secara otomatis
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row justify-center items-center gap-6 text-sm ">
                    <Input
                      color="default"
                      type="number"
                      label="Jumlah Nutrisi"
                    />
                    <Button variant="flat" color="default">
                      Update
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
              <div className="w-11/12 grid grid-rows-1 grid-cols-1 justify-center items-center gap-4 text-sm pt-4">
                <div className="flex flex-row justify-start items-center gap-2 bg-green-200 p-2 rounded-lg">
                  <Slider
                    isDisabled
                    hideThumb={true}
                    label="pH Air"
                    color="warning"
                    hideValue={true}
                    step={1}
                    maxValue={1000}
                    minValue={0}
                    defaultValue={75}
                  />
                  <div className="flex flex-row items-center justify-center">
                    <WaterDropIcon color="warning" />
                    <p className="text-sm">36 pH</p>
                  </div>
                </div>
                <LoadingButton
                  size="small"
                  onClick={handlePH}
                  loading={loadingPH}
                  loadingIndicator="Proses..."
                  variant="text"
                >
                  <span>Stabilkan</span>
                </LoadingButton>
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
                    <p>Gelap</p>
                    <p>(Siang)</p>
                  </div>
                </div>
                {isSelectedLampu ? (
                  <div>
                    <p className="text-sm">
                      Lampu dikendalikan secara otomatis
                    </p>
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
                    <p>Deteksi:</p>
                    <p>Ada Hama</p>
                  </div>
                </div>
                {isSelectedAI ? (
                  <div>
                    <p className="text-sm">AI Pendeteksi Hama Aktif</p>
                  </div>
                ) : (
                  <div className="flex flex-row justify-center items-center gap-6 text-sm ">
                    <Switch size="sm" color="primary">
                      Pestisida
                    </Switch>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Typography className="text-center p-4">
          Anda tidak memiliki akses, silahkan hubungi admin!
        </Typography>
      )}
    </main>
  );
}
