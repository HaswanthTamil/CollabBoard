import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CollabBoard",
  description: "All in one productivity app for teams.",
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
