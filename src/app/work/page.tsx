import type { Metadata } from "next";
import WorkPageHeader from "@/components/work/WorkPageHeader";
import WorkClient from "@/components/work/WorkClient";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Portfolio of video editing, motion graphic, and graphic design projects by Fandi Putra Atmadatam.",
};

export default function WorkPage() {
  return (
    <div className="pt-[var(--nav-height)]">
      <div className="site-container section-gap">
        <WorkPageHeader />
        <WorkClient />
      </div>
    </div>
  );
}
