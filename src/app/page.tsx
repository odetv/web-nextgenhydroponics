"use client";
import * as React from "react";
import Hero from "@/components/Hero";
import Collaboration from "@/components/Collaboration";

export default function LandingPage() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-16">
      <div id="">
        <Hero />
      </div>
      <div id="overview">
        <Collaboration />
      </div>
    </main>
  );
}
