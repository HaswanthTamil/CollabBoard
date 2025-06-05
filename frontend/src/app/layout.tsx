import type { Metadata } from "next"
import "../styles/globals.css"
import NavPanel from "@/components/NavPanel"

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
      <body>
        <div className="flex">
          <NavPanel />
          <main className="flex-1 md:ml-16">{children}</main>
        </div>
      </body>
    </html>
  )
}
