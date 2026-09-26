import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Fandi Putra Atmadatam for video editing, motion graphic, and graphic design projects.",
};

export default function ContactPage() {
  return (
    <div className="pt-[var(--nav-height)]">
      <div className="site-container section-gap">
        <ContactPageClient />
        <ContactClient />
      </div>
    </div>
  );
}
