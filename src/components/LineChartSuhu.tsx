"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import ImageIcon from "@mui/icons-material/Image";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import CloudIcon from "@mui/icons-material/Cloud";
import * as XLSX from "xlsx";
import { database } from "../../firebaseConfig";
import { get, limitToLast, onValue, query, ref } from "firebase/database";

export default function LineChartSuhu() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<{
    air: number[];
    udara: number[];
  }>({ air: [], udara: [] });
  const [labels, setLabels] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<string>("1d"); // Default 1 day
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datesRef = ref(database, "esp32info");
        const datesSnapshot = await get(datesRef);
        if (datesSnapshot.exists()) {
          const datesData = datesSnapshot.val();
          const dates = Object.keys(datesData);

          const filteredDates = filterDates(dates, timeRange);
          if (filteredDates.length === 0) {
            console.error("No data available for the selected time range.");
            return;
          }
          const latestDate = filteredDates.sort().reverse()[0];

          const dataRef = ref(database, `esp32info/${latestDate}`);
          onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
              console.error("No data available for the latest date.");
              return;
            }
            const newChartDataAir: number[] = [];
            const newChartDataUdara: number[] = [];
            const newLabels: string[] = [];

            const times = Object.keys(data)
              .sort()
              .reverse()
              .slice(0, 10)
              .reverse();

            times.forEach((time) => {
              newLabels.push(time);
              newChartDataAir.push(parseFloat(data[time].sensor_suhu_air));
              newChartDataUdara.push(parseFloat(data[time].sensor_suhu_udara));
            });

            setLabels(newLabels);
            setChartData({ air: newChartDataAir, udara: newChartDataUdara });
            setTimestamp(`${latestDate} ${times[times.length - 1]}`);
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeRange]);

  const [sensorKelembapanUdara, setSensorKelembapanUdara] = useState<
    string | null
  >(null);

  useEffect(() => {
    const esp32InfoRef = ref(database, "esp32info");
    const latestQuery = query(esp32InfoRef, limitToLast(1));

    onValue(latestQuery, (latestSnapshot) => {
      latestSnapshot.forEach((latestDateSnapshot) => {
        latestDateSnapshot.forEach((latestTimeSnapshot) => {
          const latestData = latestTimeSnapshot.val();
          const latestSensorKelembapanUdara =
            latestData.sensor_kelembaban_udara;
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

  const filterDates = (dates: string[], range: string) => {
    const now = new Date();
    let filteredDates: string[] = [];

    switch (range) {
      case "1d":
        const oneDayAgo = new Date(now);
        oneDayAgo.setDate(now.getDate() - 1);
        filteredDates = dates.filter((date) => {
          const dateParts = date.split("-");
          const dateObj = new Date(
            parseInt(dateParts[0]),
            parseInt(dateParts[1]) - 1,
            parseInt(dateParts[2])
          );
          return dateObj >= oneDayAgo;
        });
        break;
      case "7d":
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        filteredDates = dates.filter((date) => {
          const dateParts = date.split("-");
          const dateObj = new Date(
            parseInt(dateParts[0]),
            parseInt(dateParts[1]) - 1,
            parseInt(dateParts[2])
          );
          return dateObj >= sevenDaysAgo;
        });
        break;
      case "1m":
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        filteredDates = dates.filter((date) => {
          const dateParts = date.split("-");
          const dateObj = new Date(
            parseInt(dateParts[0]),
            parseInt(dateParts[1]) - 1,
            parseInt(dateParts[2])
          );
          return dateObj >= oneMonthAgo;
        });
        break;
      default:
        filteredDates = dates;
    }

    return filteredDates;
  };

  useEffect(() => {
    if (chartRef.current) {
      if ((chartRef.current as any).chart) {
        (chartRef.current as any).chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      if (context) {
        const newChart = new Chart(context, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Suhu Udara (°C)",
                data: chartData.udara,
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
              {
                label: "Suhu Air Hidroponik (°C)",
                data: chartData.air,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "category",
              },
              y: {
                beginAtZero: false,
              },
            },
          },
        });
        (chartRef.current as any).chart = newChart;
      }
    }
  }, [chartData, labels]);

  function handleDownloadImageJPG() {
    if (chartRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = chartRef.current.width;
      canvas.height = chartRef.current.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(chartRef.current, 0, 0);
        const file = canvas.toDataURL("image/jpg");
        const link = document.createElement("a");
        link.href = file;
        link.download = "LineChartSuhu.jpg";
        link.click();
      }
    }
  }

  function handleDownloadImagePNG() {
    if (chartRef.current) {
      const file = chartRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = file;
      link.download = "LineChartSuhu.png";
      link.click();
    }
  }

  function handleDownloadExcel() {
    if (chartRef.current && (chartRef.current as any).chart) {
      const chart = (chartRef.current as any).chart;
      const data = [
        ["Tanggal", "Waktu", "Suhu Air Hidroponik (°C)", "Suhu Udara (°C)"],
        ...chart.data.labels.map((label: any, index: string | number) => [
          timestamp.split(" ")[0],
          label,
          chart.data.datasets[0].data[index],
          chart.data.datasets[1].data[index],
        ]),
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SheetSuhu");
      XLSX.writeFile(workbook, "LineChartSuhu.xlsx");
    }
  }

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="text-xs flex flex-row items-center justify-start">
          <p className="pr-1 font-bold">Waktu:</p>
          <p>{timestamp ? timestamp : "-"}</p>
        </div>

        <div className="text-xs flex flex-row items-center justify-center">
          <CloudIcon color="primary" />
          <p className="pl-1">{sensorKelembapanUdara}</p>
          <p>%</p>
        </div>

        <Dropdown backdrop="transparent" radius="sm" className="p-1 mb-4">
          <DropdownTrigger>
            <Button variant="flat" color="success" size="sm" radius="sm">
              Filter Waktu
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Filter Time Range">
            <DropdownItem onClick={() => setTimeRange("1d")} key="1d">
              1 Hari yang Lalu
            </DropdownItem>
            <DropdownItem onClick={() => setTimeRange("7d")} key="7d">
              7 Hari yang Lalu
            </DropdownItem>
            <DropdownItem onClick={() => setTimeRange("1m")} key="1m">
              1 Bulan yang Lalu
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <canvas className="" ref={chartRef} />
      <div className="flex flex-row gap-2 justify-center items-center pt-1">
        <Dropdown backdrop="transparent" radius="sm" className="p-1">
          <DropdownTrigger>
            <Button variant="flat" color="success" size="sm" radius="sm">
              Chart Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem
              onClick={handleDownloadImagePNG}
              startContent={<ImageOutlinedIcon fontSize="small" />}
              key="png"
              color="default"
              variant="flat"
            >
              Simpan Gambar (.png)
            </DropdownItem>
            <DropdownItem
              onClick={handleDownloadImageJPG}
              startContent={<ImageIcon fontSize="small" />}
              key="jpg"
              color="default"
              variant="flat"
            >
              Simpan Gambar (.jpg)
            </DropdownItem>
            <DropdownItem
              onClick={handleDownloadExcel}
              startContent={<InsertDriveFileIcon fontSize="small" />}
              key="excel"
              color="default"
              variant="flat"
            >
              Simpan File Excel (.xlsx)
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
