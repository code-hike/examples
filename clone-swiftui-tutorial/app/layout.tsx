import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CloneUI Tutorials | Code Hike Examples",
  description:
    "A clone of the SwiftUI Tutorials website, built with Code Hike v1.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-zinc-100">
      <body className={inter.className}>
        {children}
        <footer className="py-8  flex justify-center gap-4 text-zinc-700 text-sm">
          <a href="https://codehike.org" className="hover:underline">
            Code Hike docs
          </a>
          <span>•</span>
          <a
            href="https://github.com/code-hike/examples/tree/main/clone-swiftui-tutorial"
            className="hover:underline"
          >
            Example source code
          </a>
          <span>•</span>
          <a
            href="https://developer.apple.com/tutorials/swiftui"
            className="hover:underline"
          >
            Original SwiftUI website
          </a>
        </footer>
      </body>
    </html>
  )
}
