import ThreeDotsIcon from "@/components/ThreeDotsIcon"

const Note = () => {
  return (
    <>
      <div>
        <div className="note-head flex">
          <div className="note-title px-2 pt-1 font-semibold flex-grow text-xl md:text-2xl lg:text-4xl">
            Title
          </div>
          <ThreeDotsIcon />
        </div>
        <div>Content</div>
      </div>
    </>
  )
}

export default Note
