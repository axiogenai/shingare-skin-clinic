import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Clinic Consultation",
  description:
    "Request a consultation at Shingare Skin & Cosmetics Clinic in Peth Vadgaon, Kolhapur. Choose a care area and share your preferred appointment details.",
  alternates: { canonical: "/book-now" },
  openGraph: {
    title: "Book a Consultation | Shingare Skin & Cosmetics Clinic",
    description:
      "Request a skin, hair or cosmetic-care consultation at the clinic in Peth Vadgaon, Kolhapur.",
    url: "/book-now",
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
