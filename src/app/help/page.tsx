"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Help() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div
      id="help"
      className="pt-6 sm:pt-12 pb-8 p-4 flex flex-col gap-2 justify-center items-center max-w-screen-xl mx-auto"
    >
      <div>
        <p className="font-bold text-center text-emerald-600">FAQ</p>
      </div>
      <div>
        <p className="font-bold text-3xl text-center">
          Bantuan Pertanyaan Umum
        </p>
      </div>
      <div>
        <p className="text-center text-sm sm:text-base">
          Fakultas Teknik dan Kejuruan Universitas Pendidikan Ganesha melakukan
          kerja sama kolaborasi bersama dengan PT. Dago Engineering, Bandung.
          Sebagai bentuk penggunaan teknologi, MBKM ini mengusung tema Smart
          Green Garden yang berfokus pada sektor pertanian hidroponik dan sektor
          teknologi canggih yaitu Internet of Things (IoT), Artificial
          Intelligence (AI), dan pemanfaatan Energi Terbarukan dari sinar
          matahari menggunakan panel surya.
        </p>
      </div>
      <div className="text-sm w-full mt-2 bg-gray-100 rounded-lg p-2">
        <Accordion isCompact>
          <AccordionItem key="1" aria-label="Pertanyaan 1" title="Pertanyaan 1">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Pertanyaan 2" title="Pertanyaan 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Pertanyaan 3" title="Pertanyaan 3">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="4" aria-label="Pertanyaan 4" title="Pertanyaan 4">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="5" aria-label="Pertanyaan 5" title="Pertanyaan 5">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="6" aria-label="Pertanyaan 6" title="Pertanyaan 6">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
