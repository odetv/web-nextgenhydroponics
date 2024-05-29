"use client";
import * as React from "react";
import Hero from "@/components/Hero";
import Collaboration from "@/components/Collaboration";
import Team from "@/components/Team";
import Features from "@/components/Features";
import Contact from "@/components/Contact";
import Tanaman from "@/components/Tanaman";

export default function LandingPage() {
  return (
    <main
      id="beranda"
      className="flex flex-col justify-center items-center min-h-screen pb-16 pt-4 sm:pt-16"
    >
      {/* <Tanaman /> */}
      <Hero />
      <Collaboration />
      <Team />
      <Features />
      <Contact />
    </main>
  );
}
