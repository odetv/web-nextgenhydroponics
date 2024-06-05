"use client";
import * as React from "react";
import Hero from "@/components/Hero";
import Collaboration from "@/components/Collaboration";
import Team from "@/components/Team";
import Features from "@/components/Features";
import Contact from "@/components/Contact";
import { motion, useScroll, useSpring } from "framer-motion";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main
      id="beranda"
      className="flex flex-col justify-center items-center min-h-screen pb-16 pt-4 sm:pt-16"
    >
      <motion.div
        className="progress-bar fixed top-16 left-0 right-0 h-1 origin-left bg-green-500 z-50"
        style={{ scaleX }}
      />
      <Hero />
      <Collaboration />
      <Team />
      <Features />
      <Contact />
    </main>
  );
}
