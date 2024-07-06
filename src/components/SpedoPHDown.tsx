import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React, { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { limitToLast, onValue, query, ref } from "firebase/database";

export default function SpedoPHDown() {
  const [kapasitasPHDown, setKapasitasPHDown] = useState<string | null>(null);

  useEffect(() => {
    const esp32InfoRef = ref(database, "esp32info");
    const latestQuery = query(esp32InfoRef, limitToLast(1));

    onValue(latestQuery, (latestSnapshot) => {
      latestSnapshot.forEach((latestDateSnapshot) => {
        latestDateSnapshot.forEach((latestTimeSnapshot) => {
          const latestData = latestTimeSnapshot.val();
          const latestKapasitasPHDown = latestData.kapasitas_ph_down;

          if (
            latestKapasitasPHDown !== null &&
            latestKapasitasPHDown >= 0 &&
            latestKapasitasPHDown <= 46
          ) {
            const jarakSensorKeTutupTandon = 32;
            const tinggiTandon = 14;

            // Hitung tinggi air dari dasar tandon
            const tinggiAir =
              tinggiTandon - (latestKapasitasPHDown - jarakSensorKeTutupTandon);

            // Pastikan tinggi air tidak melebihi tinggi tandon
            const tinggiAirValid = Math.max(
              0,
              Math.min(tinggiAir, tinggiTandon)
            );

            // Hitung kapasitas dalam liter
            const kapasitasPHDownInLiters = (tinggiAirValid / tinggiTandon) * 5;

            // Membulatkan ke dua desimal
            const kapasitasPHDownInLitersRounded =
              kapasitasPHDownInLiters.toFixed(1);

            // Konversi ke string sebelum diset
            setKapasitasPHDown(kapasitasPHDownInLitersRounded);
          } else if (latestKapasitasPHDown > 46) {
            // Jika nilai > 46 cm, set kapasitas menjadi 0 liter
            setKapasitasPHDown("0");
          } else {
            console.error(
              "Invalid latestKapasitasPHDown value:",
              latestKapasitasPHDown
            );
          }
        });
      });
    });
  }, []);

  return (
    <div className="">
      <p className="text-sm -mb-6 text-center">pH Down</p>
      <Gauge
        startAngle={-110}
        endAngle={110}
        width={172}
        height={172}
        value={Number(kapasitasPHDown)}
        valueMin={0}
        valueMax={5}
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
