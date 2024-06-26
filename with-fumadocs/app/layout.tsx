import "./global.css"
import { RootProvider } from "fumadocs-ui/provider"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layout"
import { docsOptions } from "./layout.config"

const inter = Inter({
  subsets: ["latin"],
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <RootProvider>
          <DocsLayout {...docsOptions}>{children}</DocsLayout>
        </RootProvider>
      </body>
    </html>
  )
}
