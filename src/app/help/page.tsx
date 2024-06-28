"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Help() {
  const helpList = [
    {
      questionContent: "Apa sih itu Next-Gen Hydroponics?",
      answerContent:
        "Next-Gen Hydroponics adalah sistem pertanian hidroponik canggih yang menggabungkan teknologi AI dan IoT dengan energi terbarukan yaitu panel surya untuk meningkatkan efisiensi dan keberlanjutan.",
    },
    {
      questionContent: "Tanaman apa aja yang ditanam Next-Gen Hydroponics?",
      answerContent:
        "Untuk saat ini, ada 2 tanaman yaitu Cabai dan Selada. Kedepannya, banyak Mulai dari sayuran hijau kayak selada, bayam, sampai tanaman buah kecil kayak tomat dan cabai.",
    },
    {
      questionContent:
        "Kenapa kita harus menggunakan teknologi AI dan IoT pada hidroponik?",
      answerContent:
        "Teknologi AI dan IoT membantu memonitor dan mengatur kondisi tanaman secara otomatis, kayak suhu, kelembapan, pH, dan nutrisi, jadi tanaman bisa tumbuh lebih optimal tanpa perlu banyak perawatan sehingga bisa lebih optimal.",
    },
    {
      questionContent: "Gimana cara kerjanya Next-Gen Hydroponics ini?",
      answerContent:
        "Sistem ini menggunakan sensor untuk mengukur kondisi lingkungan tanaman dan datanya dikirim ke mikrokontroller dan sistem AI. Maka, mikrokontroler dan AI ini yang nanti mengatur segalanya biar tanaman dapet kondisi terbaik untuk tumbuh.",
    },
    {
      questionContent: "Apakah menggunakan panel surya bisa hemat energi?",
      answerContent:
        "Yup, dengan panel surya, sistem hidroponik ini bisa jalan pakai energi matahari, jadi tidak terlalu bergantung dengan listrik dari PLN dan pastinya lebih ramah lingkungan.",
    },
    {
      questionContent: "Siapa aja yang bisa manfaatin teknologi ini?",
      answerContent:
        "Semua bisa, mulai dari petani kecil, para pecinta hobi tanaman, sampai perusahaan besar yang mau lebih efisien dan sustainable dalam bertani.",
    },
    {
      questionContent: "Gampang gak pakai sistem ini?",
      answerContent:
        "Gampang kok, semua udah otomatis dan bisa di konfigurasi manual juga.",
    },
    {
      questionContent:
        "Berapa biaya buat pasang sistem Next-Gen Hydroponics ini?",
      answerContent:
        "Biayanya variatif tergantung skala yang kamu mau. Untuk detailnya, bisa kontak tim kita buat konsultasi lebih lanjut.",
    },
    {
      questionContent:
        "Bisa nggak sistem ini dipakai di daerah yang sinar mataharinya nggak terlalu kuat?",
      answerContent:
        "Bisa aja, selama ada cukup sinar matahari buat ngisi baterai panel surya. Kalau kurang, bisa pakai kombinasi dengan sumber listrik lain.",
    },
    {
      questionContent: "Apakah sistem ini ramah lingkungan?",
      answerContent:
        "Pastinya! Dengan energi terbarukan dan pengelolaan yang efisien, kita bisa mengurangi jejak karbon dan limbah yang dihasilkan dari pertanian konvensional.",
    },
    {
      questionContent:
        "Apa yang membuat Next-Gen Hydroponics beda dari sistem hidroponik lain?",
      answerContent:
        "Integrasi teknologi AI dan IoT yang canggih serta penggunaan energi terbarukan bikin sistem ini lebih efisien, otomatis, dan sustainable dibanding yang lain.",
    },
    {
      questionContent: "Bagaimana cara saya melihat performa tanaman saya?",
      answerContent:
        "Kamu bisa cek performa tanaman lewat aplikasi mobile atau website yang sudah terhubung dengan sistem Next-Gen Hydroponics.",
    },
    {
      questionContent:
        "Apakah saya bisa mengontrol sistem ini dari jarak jauh?",
      answerContent:
        "Bisa banget! Kamu bisa mengontrol dan memonitor sistem hidroponik ini lewat aplikasi mobile atau website, jadi kamu bisa cek kondisi tanaman dari mana saja dan kapan saja.",
    },
  ];

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
          {helpList.map((item, index) => (
            <AccordionItem
              key={index}
              aria-label={item.questionContent}
              title={item.questionContent}
            >
              {item.answerContent}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
