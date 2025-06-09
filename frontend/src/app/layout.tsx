import type { Metadata } from "next"
import "../styles/globals.css"
import NavPanel from "@/components/nonreusable-ui/NavPanel"
import { ThemeProvider } from "next-themes"
import Head from "next/head"

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
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </Head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex-grow">{children}</main>

          {/* NavPanel fixed bottom only on mobile */}
          <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
            <NavPanel />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
