import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = "https://shingareclinic.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shingare Skin & Cosmetics Clinic | Skin & Hair Care in Kolhapur",
    template: "%s | Shingare Skin & Cosmetics Clinic",
  },
  description:
    "Explore skin, hair and cosmetic care at Shingare Skin & Cosmetics Clinic in Peth Vadgaon, Kolhapur. Learn about treatments and book a consultation with our clinic team.",
  applicationName: "Shingare Skin & Cosmetics Clinic",
  category: "health",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Shingare Skin & Cosmetics Clinic",
    title: "Shingare Skin & Cosmetics Clinic | Skin & Hair Care in Kolhapur",
    description:
      "Skin, hair and cosmetic care in Peth Vadgaon, Kolhapur. Explore clinic services and request a consultation.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shingare Skin & Cosmetics Clinic",
    description:
      "Skin, hair and cosmetic care in Peth Vadgaon, Kolhapur.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Keep browser zoom enabled for accessibility.
};

const clinicStructuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Shingare Skin & Cosmetics Clinic",
  url: siteUrl,
  telephone: "+91-72497-27104",
  areaServed: {
    "@type": "Place",
    name: "Peth Vadgaon, Kolhapur, Maharashtra, India",
  },
  medicalSpecialty: "Dermatology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amita:wght@400;700&family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Mukta:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(clinicStructuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-[100dvh] w-full flex flex-col font-['Source_Sans_3',sans-serif] bg-white text-gray-900 selection:bg-[#108283] selection:text-white antialiased overflow-x-hidden">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
