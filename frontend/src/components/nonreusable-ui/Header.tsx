"use client"

import NavPanel from "./NavPanel"
import SearchBar from "../reusable-ui/SearchBar"
import Image from "next/image"

const Header = () => {
  return (
    <header
      role="banner"
      className="header flex items-center gap-2 px-4 py-2 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 sticky top-0 z-10"
    >
      <Image
        src="/logo.png"
        alt="CollabBoard Logo"
        width={40}
        height={40}
        priority
      />
      <SearchBar />
      <div className="hidden md:flex md:flex-1 md:justify-end">
        <NavPanel />
      </div>
    </header>
  )
}

export default Header
