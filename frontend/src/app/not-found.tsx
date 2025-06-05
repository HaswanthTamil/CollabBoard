import Link from "next/link"
import "../styles/globals.css"

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center dark:bg-black">
      <h1 className="text-4xl font-bold dark:text-white">404</h1>
      <p className="text-lg mt-2 dark:text-white">Page not found, my dude.</p>
      <Link href="/" className="mt-4 text-blue-500 underline">
        Take me home
      </Link>
    </div>
  )
}
