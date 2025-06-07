import Header from "@/components/nonreusable-ui/Header"
import NoteCard from "@/components/reusable-ui/NoteCard"
import { NoteData } from "@/lib/data/data"

const NoteBook = () => {
  return (
    <>
      <div className="bg-white dark:bg-black flex flex-col h-screen">
        <Header />
        <ul className="columns-2 gap-2 space-y-2 p-2 overflow-auto flex-grow">
          {NoteData.map((item) => {
            return <NoteCard key={item.id} {...item} />
          })}
        </ul>
      </div>
    </>
  )
}

export default NoteBook
