import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/Layout/Sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Walytics — Walrus Storage Analytics",
  description:
    "Real-time analytics dashboard for Walrus decentralized storage on Sui. Explore blobs, analyze patterns, and get AI-powered insights.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-auto">
          <div className="flex-1 p-6 lg:p-8">
            {children}
          </div>
          <footer className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-400 dark:border-zinc-800 lg:px-8">
            Created by{" "}
            <a
              href="https://x.com/EdCriptoFi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              ED
            </a>{" "}
            · Built for{" "}
            <a
              href="https://tatum.io/tatum-x-walrus-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              Tatum x Walrus Hackathon
            </a>
            ·{" "}
            <a
              href="https://github.com/EdCryptoFi/Walytics"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              GitHub
            </a>
          </footer>
        </main>
      </body>
    </html>
  )
}
