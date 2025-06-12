import Header from "@/components/nonreusable-ui/Header"
import NoteCard from "@/components/reusable-ui/NoteCard"
import { NoteData } from "@/lib/data/data"
import Link from "next/link"
// import { useSearchParams } from "next/navigation"

async function getNotes() {
  // to replace with actual data fetching (DB, API, etc.)
  return NoteData
}

const NoteBook = async () => {
  const notes = await getNotes()
  return (
    <>
      <div className="bg-white dark:bg-black flex flex-col h-screen">
        <Header />

        {notes.length > 0
          ? notes.map((item, index) => {
              return (
                <Link href={`notebook/${item.id}`} key={index}>
                  <ul className="columns-2 gap-2 space-y-2 p-2 overflow-auto flex-grow">
                    <NoteCard key={item.id} {...item} />
                  </ul>
                </Link>
              )
            })
          : "No notes found"}
      </div>
    </>
  )
}

export default NoteBook
