import type { Metadata } from "next";
import { Suspense } from "react";
import QRRedirectHandler from "@/components/QRRedirectHandler";
import ClinicHomepage from "@/components/ClinicHomepage";

export const metadata: Metadata = {
  title: "Dermatologist in Peth Vadgaon, Kolhapur | Shingare Skin & Cosmetics Clinic",
  description:
    "Explore skin, hair and cosmetic care at Shingare Skin & Cosmetics Clinic in Peth Vadgaon, Kolhapur. Discover treatments and request a consultation.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shingare Skin & Cosmetics Clinic | Peth Vadgaon, Kolhapur",
    description:
      "Thoughtful skin, hair and cosmetic care. Explore our clinic and request a consultation in Peth Vadgaon, Kolhapur.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <QRRedirectHandler />
      </Suspense>
      <ClinicHomepage />
    </>
  );
}
