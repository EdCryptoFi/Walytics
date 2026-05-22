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
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  )
}
