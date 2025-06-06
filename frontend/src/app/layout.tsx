import type { Metadata } from "next"
import "../styles/globals.css"
import NavPanel from "@/components/nonreusable-ui/NavPanel"

export const metadata: Metadata = {
  title: "CollabBoard",
  description: "All in one productivity app for teams.",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>

        {/* NavPanel fixed bottom only on mobile */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
          <NavPanel />
        </div>
      </body>
    </html>
  )
}
