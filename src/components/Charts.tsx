import { LineChart } from "@mui/x-charts/LineChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React, { useState, useEffect } from "react";

export default function Charts() {
  const generateRandomValue = (max: number) => Math.floor(Math.random() * max);

  const [uData, setUData] = useState(generateSmoothData(24, 100));
  const [aData, setAData] = useState(generateSmoothData(24, 100));

  const nutrisiMax = 10;
  const phAirMax = 1000;

  const [nutrisiValue, setNutrisiValue] = useState(
    generateRandomValue(nutrisiMax)
  );
  const [phAirValue, setPhAirValue] = useState(generateRandomValue(phAirMax));

  const xLabels = [
    "12AM",
    "1AM",
    "2AM",
    "3AM",
    "4AM",
    "5AM",
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM",
  ];

  function generateSmoothData(length: number, max: number) {
    const data = [];
    let currentValue = generateRandomValue(max);
    for (let i = 0; i < length; i++) {
      const change = (Math.random() - 0.5) * 10; // Small random change
      currentValue = Math.min(max, Math.max(0, currentValue + change)); // Keep within bounds
      data.push(currentValue);
    }
    return data;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setUData((prevData) => {
        const newData = prevData.slice(1);
        const lastValue = newData[newData.length - 1];
        const change = (Math.random() - 0.5) * 10;
        const newValue = Math.min(100, Math.max(0, lastValue + change));
        newData.push(newValue);
        return newData;
      });

      setAData((prevData) => {
        const newData = prevData.slice(1);
        const lastValue = newData[newData.length - 1];
        const change = (Math.random() - 0.5) * 10;
        const newValue = Math.min(100, Math.max(0, lastValue + change));
        newData.push(newValue);
        return newData;
      });

      setNutrisiValue(generateRandomValue(nutrisiMax));
      setPhAirValue(generateRandomValue(phAirMax));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
      <div className="">
        <LineChart
          width={400}
          height={300}
          series={[
            {
              data: aData,
              // area: true,
              label: "Suhu Udara",
              yAxisKey: "leftAxisId",
            },
            {
              data: uData,
              // area: true,
              label: "Suhu Air",
              yAxisKey: "rightAxisId",
            },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
          rightAxis="rightAxisId"
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-1 gap-10 text-center">
        <div>
          <p className="text-sm">Kondisi Nutrisi</p>
          <Gauge
            startAngle={-110}
            endAngle={110}
            width={100}
            height={100}
            value={nutrisiValue}
            valueMin={0}
            valueMax={10}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#52b202",
              },
              [`& .${gaugeClasses.valueText}`]: {
                transform: "translate(0px, 0px)",
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
        <div>
          <p className="text-sm">Kondisi pH Air</p>
          <Gauge
            startAngle={-110}
            endAngle={110}
            width={100}
            height={100}
            value={phAirValue}
            valueMin={0}
            valueMax={1000}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 11,
                transform: "translate(0px, 0px)",
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
      </div>
    </div>
  );
}
