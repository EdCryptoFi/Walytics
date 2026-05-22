import type { Metadata } from "next";
import {
  Archivo_Black,
  Space_Grotesk,
  JetBrains_Mono,
  Playfair_Display,
  Crimson_Pro,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Layout/Nav";
import { ThemeProvider } from "@/components/Layout/ThemeProvider";
import { TweaksPanel } from "@/components/TweaksPanel";

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo-black",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700", "800"],
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  weight: ["700", "900"],
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Walytics — The Game is a Blob",
  description:
    "Real-time analytics dashboard for Walrus decentralized storage on Sui. Catalogue your blobs, interrogate your publishers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[
      archivoBlack.variable,
      spaceGrotesk.variable,
      jetbrainsMono.variable,
      playfairDisplay.variable,
      crimsonPro.variable,
    ].join(" ")}>
      <body>
        <ThemeProvider>
          <div className="app">
            <Nav/>
            <main>
              {children}
            </main>
            <TweaksPanel/>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
