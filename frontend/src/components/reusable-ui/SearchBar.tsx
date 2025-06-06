"use client"

import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div
      className="flex flex-grow items-center gap-1 border-1 border-gray-400 dark:border-zinc-600 rounded-full px-2 py-1"
      role="search"
      aria-label="Site search"
    >
      <Search
        className="w-5 h-5 text-zinc-500 dark:text-zinc-400"
        aria-hidden="true"
      />
      <input
        type="text"
        placeholder="Search..."
        aria-label="Search"
        className="flex-1 bg-transparent outline-none text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
      />
    </div>
  )
}

export default SearchBar
