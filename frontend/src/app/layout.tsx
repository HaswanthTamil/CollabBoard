import type { Metadata } from "next"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "CollabBoard",
  description: "All in one productivity app for teams.",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
