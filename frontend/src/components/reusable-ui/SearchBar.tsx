import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <>
      <div className="flex items-center gap-2 w-full max-w-md px-4 py-2 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 shadow-sm focus-within:ring-2 rounded-md focus-within:ring-blue-500">
        <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />{" "}
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent outline-none text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
      </div>
    </>
  )
}

export default SearchBar
