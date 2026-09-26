import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Fandi Putra Atmadatam — Video Editor, Motion Graphic Designer, and Graphic Designer based in Indonesia.",
};

export default function AboutPage() {
  return <AboutClient />;
}
