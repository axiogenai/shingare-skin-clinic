import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shingare Skin & Cosmetics Clinic | शिंगारे स्किन & कॉस्मेटीक क्लिनिक",
  description:
    "Advanced Skin, Hair & Cosmetic Treatments by Dr. Pramod Shingare (MD Ayu, D.Dermatology) & Dr. Priyanka Shingare (BHMS, FCHD) in Peth Vadgaon, Kolhapur. Digital OPD & ClinicOS integration.",
  metadataBase: new URL("https://shingareclinic.in"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amita:wght@400;700&family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Mukta:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
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
