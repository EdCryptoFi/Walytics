import type { Metadata } from "next";
import {
  Archivo_Narrow,
  Inter,
  Courier_Prime,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Layout/Nav";
import { ThemeProvider } from "@/components/Layout/ThemeProvider";
import { FlashlightOverlay } from "@/components/Layout/FlashlightOverlay";
import { AudioIntro } from "@/components/Layout/AudioIntro";
import { NoiseOverlay } from "@/components/UI/NoiseOverlay";
import { DetectiveBackground } from "@/components/UI/DetectiveBackground";

const archivoNarrow = Archivo_Narrow({
  weight: ["400", "700"],
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-courier-prime",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Walytics — The Game is a Blob",
  description:
    "Real-time analytics dashboard for Walrus decentralized storage on Sui. Catalogue your blobs, interrogate your publishers.",
  metadataBase: new URL("https://walytics.vercel.app"),
  openGraph: {
    title: "Walytics — The Game is a Blob",
    description:
      "Real-time analytics dashboard for Walrus decentralized storage on Sui. Catalogue your blobs, interrogate your publishers.",
    url: "https://walytics.vercel.app",
    siteName: "Walytics",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Walytics — The Game is a Blob",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Walytics — The Game is a Blob",
    description:
      "Real-time analytics dashboard for Walrus decentralized storage on Sui. Catalogue your blobs, interrogate your publishers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[
      archivoNarrow.variable,
      inter.variable,
      courierPrime.variable,
    ].join(" ")}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>
          <DetectiveBackground/>
          <NoiseOverlay/>
          <div id="flashlight-overlay" />
          <div className="app wood-desk" style={{ position: "relative", zIndex: 1 }}>
            <Nav/>
            <main>
              {children}
            </main>
          </div>
          <FlashlightOverlay/>
          <AudioIntro/>
        </ThemeProvider>
      </body>
    </html>
  );
}
