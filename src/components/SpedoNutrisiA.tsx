import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React, { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { limitToLast, onValue, query, ref } from "firebase/database";

export default function SpedoNutrisiA() {
  const [kapasitasNutrisiA, setKapasitasNutrisiA] = useState<string | null>(
    null
  );

  useEffect(() => {
    const esp32InfoRef = ref(database, "esp32info");
    const latestQuery = query(esp32InfoRef, limitToLast(1));

    onValue(latestQuery, (latestSnapshot) => {
      latestSnapshot.forEach((latestDateSnapshot) => {
        latestDateSnapshot.forEach((latestTimeSnapshot) => {
          const latestData = latestTimeSnapshot.val();
          const latestKapasitasNutrisiA = latestData.kapasitas_nutrisi_a;

          if (
            latestKapasitasNutrisiA !== null &&
            latestKapasitasNutrisiA >= 0 &&
            latestKapasitasNutrisiA <= 46
          ) {
            const jarakSensorKeTutupTandon = 32;
            const tinggiTandon = 14;

            // Hitung tinggi air dari dasar tandon
            const tinggiAir =
              tinggiTandon -
              (latestKapasitasNutrisiA - jarakSensorKeTutupTandon);

            // Pastikan tinggi air tidak melebihi tinggi tandon
            const tinggiAirValid = Math.max(
              0,
              Math.min(tinggiAir, tinggiTandon)
            );

            // Hitung kapasitas dalam liter
            const kapasitasNutrisiAInLiters =
              (tinggiAirValid / tinggiTandon) * 5;

            // Membulatkan ke dua desimal
            const kapasitasNutrisiAInLitersRounded =
              kapasitasNutrisiAInLiters.toFixed(1);

            // Konversi ke string sebelum diset
            setKapasitasNutrisiA(kapasitasNutrisiAInLitersRounded);
          } else if (latestKapasitasNutrisiA > 46) {
            // Jika nilai > 46 cm, set kapasitas menjadi 0 liter
            setKapasitasNutrisiA("0");
          } else {
            console.error(
              "Invalid latestKapasitasNutrisiA value:",
              latestKapasitasNutrisiA
            );
          }
        });
      });
    });
  }, []);

  return (
    <div className="">
      <p className="text-sm -mb-6 text-center">Nutrisi A</p>
      <Gauge
        startAngle={-110}
        endAngle={110}
        width={172}
        height={172}
        value={Number(kapasitasNutrisiA)}
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
