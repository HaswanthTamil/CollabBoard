import ThreeDotsIcon from "./ThreeDotsIcon"

const NoteCard = () => {
  return (
    <>
      <div className="note-card w-full border-1 border-black dark:border-gray-100 rounded-md max-h-40 overflow-y-hidden bg-gray-50 dark:bg-black dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-900 shadow-sm shadow-gray-800/10 dark:shadow-gray-700 transition-all duration-300 ease-out">
        <div className="note-head flex">
          <div className="note-title px-2 pt-1 font-semibold flex-grow text-xl md:text-2xl lg:text-4xl">
            Title
          </div>
          <ThreeDotsIcon />
        </div>
        <div className="note-content px-2 py-1 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </div>
      </div>
    </>
  )
}

export default NoteCard
