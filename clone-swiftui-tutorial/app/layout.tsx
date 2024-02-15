import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title:
    "Creating and combining views — CloneUI Tutorials | Code Hike Examples",
  description:
    "This tutorial guides you through building Landmarks — an app for discovering and sharing the places you love.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
