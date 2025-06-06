<<<<<<< HEAD
import Header from "@/components/Header"
import NoteCard from "@/components/NoteCard"
=======
import Header from "@/components/nonreusable-ui/Header"
import NoteCard from "@/components/reusable-ui/NoteCard"
>>>>>>> feat/notebook-page

const NoteBook = () => {
  return (
    <>
      <div className="bg-white dark:bg-black flex flex-col h-screen">
        <Header />
        <div className="columns-2 gap-2 space-y-2 p-2 overflow-auto flex-grow">
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
      </div>
    </>
  )
}

export default NoteBook
