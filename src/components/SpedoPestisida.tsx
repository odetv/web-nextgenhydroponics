import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React, { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { limitToLast, onValue, query, ref } from "firebase/database";

export default function SpedoPestisida() {
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
          const latestKapasitasPestisida = latestData.kapasitas_pestisida;

          if (
            latestKapasitasPestisida !== null &&
            latestKapasitasPestisida >= 0 &&
            latestKapasitasPestisida <= 46
          ) {
            const jarakSensorKeTutupTandon = 32;
            const tinggiTandon = 14;

            // Hitung tinggi air dari dasar tandon
            const tinggiAir =
              tinggiTandon -
              (latestKapasitasPestisida - jarakSensorKeTutupTandon);

            // Pastikan tinggi air tidak melebihi tinggi tandon
            const tinggiAirValid = Math.max(
              0,
              Math.min(tinggiAir, tinggiTandon)
            );

            // Hitung kapasitas dalam liter
            const kapasitasPestisidaInLiters =
              (tinggiAirValid / tinggiTandon) * 5;

            // Membulatkan ke dua desimal
            const kapasitasPestisidaInLitersRounded =
              kapasitasPestisidaInLiters.toFixed(1);

            // Konversi ke string sebelum diset
            setKapasitasPestisida(kapasitasPestisidaInLitersRounded);
          } else if (latestKapasitasPestisida > 46) {
            // Jika nilai > 46 cm, set kapasitas menjadi 0 liter
            setKapasitasPestisida("0");
          } else {
            console.error(
              "Invalid latestKapasitasPestisida value:",
              latestKapasitasPestisida
            );
          }
        });
      });
    });
  }, []);

  return (
    <div className="">
      <p className="text-sm -mb-6 text-center">Pestisida</p>
      <Gauge
        startAngle={-110}
        endAngle={110}
        width={172}
        height={172}
        value={Number(kapasitasPestisida)}
        valueMin={0}
        valueMax={10}
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
