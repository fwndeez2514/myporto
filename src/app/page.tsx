import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import HomeClient from "@/components/home/HomeClient";

export const metadata: Metadata = {
  title: "Fandi Putra Atmadatam — Creative Designer",
  description:
    "Portfolio of Fandi Putra Atmadatam — Video Editor, Motion Graphic Designer, and Graphic Designer based in Indonesia.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeClient />
    </>
  );
}
