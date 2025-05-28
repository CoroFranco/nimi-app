import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { esMX } from "@clerk/localizations"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="es">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
