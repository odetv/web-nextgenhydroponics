import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React, { useState, useEffect } from "react";

export default function SpedoPH() {
  const generateRandomValue = (max: number) => Math.floor(Math.random() * max);

  const nutrisiMax = 1000;
  const phAirMax = 10;

  const [nutrisiValue, setNutrisiValue] = useState(
    generateRandomValue(nutrisiMax)
  );
  const [phAirValue, setPhAirValue] = useState(generateRandomValue(phAirMax));

  useEffect(() => {
    const interval = setInterval(() => {
      setNutrisiValue(generateRandomValue(nutrisiMax));
      setPhAirValue(generateRandomValue(phAirMax));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-sm -mb-6 text-center">pH Air Meter</p>
      <Gauge
        startAngle={-110}
        endAngle={110}
        width={172}
        height={172}
        value={phAirValue}
        valueMin={0}
        valueMax={10}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            transform: "translate(0px, 0px)",
          },
        })}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
      />
    </div>
  );
}
