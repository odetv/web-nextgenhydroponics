import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { limitToLast, onValue, query, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";

export default function SpedoAirHidroponik() {
  const [kapasitasTandonPencampuran, setKapasitasTandonPencampuran] = useState<
    string | null
  >(null);

  useEffect(() => {
    const esp32InfoRef = ref(database, "esp32info");
    const latestQuery = query(esp32InfoRef, limitToLast(1));

    onValue(latestQuery, (latestSnapshot) => {
      latestSnapshot.forEach((latestDateSnapshot) => {
        latestDateSnapshot.forEach((latestTimeSnapshot) => {
          const latestData = latestTimeSnapshot.val();
          const latestKapasitasTandonPencampuran =
            latestData.kapasitas_tandon_pencampuran;

          if (
            latestKapasitasTandonPencampuran !== null &&
            latestKapasitasTandonPencampuran >= 0 &&
            latestKapasitasTandonPencampuran <= 69
          ) {
            const jarakSensorKeTutupTandon = 30;
            const tinggiTandon = 39;

            // Hitung tinggi air dari dasar tandon
            const tinggiAir =
              tinggiTandon -
              (latestKapasitasTandonPencampuran - jarakSensorKeTutupTandon);

            // Pastikan tinggi air tidak melebihi tinggi tandon
            const tinggiAirValid = Math.max(
              0,
              Math.min(tinggiAir, tinggiTandon)
            );

            // Hitung kapasitas dalam liter
            const kapasitasTandonPencampuranInLiters =
              (tinggiAirValid / tinggiTandon) * 150;

            // Membulatkan ke dua desimal
            const kapasitasTandonPencampuranInLitersRounded =
              kapasitasTandonPencampuranInLiters.toFixed(1);

            // Konversi ke string sebelum diset
            setKapasitasTandonPencampuran(
              kapasitasTandonPencampuranInLitersRounded
            );
          } else if (latestKapasitasTandonPencampuran > 69) {
            // Jika nilai > 69 cm, set kapasitas menjadi 0 liter
            setKapasitasTandonPencampuran("0");
          } else {
            console.error(
              "Invalid latestKapasitasTandonPencampuran value:",
              latestKapasitasTandonPencampuran
            );
          }
        });
      });
    });
  }, []);

  return (
    <div className="">
      <p className="text-sm -mb-6 text-center">Tandon Air Hidroponik</p>
      <Gauge
        startAngle={-110}
        endAngle={110}
        width={172}
        height={172}
        value={Number(kapasitasTandonPencampuran)}
        valueMin={0}
        valueMax={150}
        sx={(theme) => ({
          // [`& .${gaugeClasses.valueArc}`]: {
          //   fill: "#52b202",
          // },
          [`& .${gaugeClasses.valueText}`]: {
            transform: "translate(0px, 0px)",
          },
        })}
        text={({ value, valueMax }) => `${value} / ${valueMax} Liter`}
      />
    </div>
  );
}
