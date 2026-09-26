import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Fandi Putra Atmadatam — Creative Designer",
    template: "%s — Fandi Putra Atmadatam",
  },
  description:
    "Portfolio of Fandi Putra Atmadatam — Video Editor, Motion Graphic Designer, and Graphic Designer based in Indonesia.",
  keywords: ["Fandi Putra Atmadatam", "video editor", "motion graphic", "graphic designer", "portfolio", "creative", "Indonesia"],
  authors: [{ name: "Fandi Putra Atmadatam" }],
  creator: "Fandi Putra Atmadatam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fandiputra.dev",
    title: "Fandi Putra Atmadatam — Creative Designer",
    description: "Video Editor · Motion Graphic · Graphic Designer based in Indonesia.",
    siteName: "Fandi Putra Atmadatam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fandi Putra Atmadatam — Creative Designer",
    description: "Video Editor · Motion Graphic · Graphic Designer based in Indonesia.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <Preloader />
          <SmoothScroll>
            <Navigation />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
