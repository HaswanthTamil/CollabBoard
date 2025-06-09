import Header from "@/components/nonreusable-ui/Header"
import Link from "next/link"

const dummyIdeas = [
  { id: "idea-1", title: "Build a productivity app" },
  { id: "idea-2", title: "Launch a portfolio site" },
  { id: "idea-3", title: "Write a fantasy short story" },
]

const IdeaBoard = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black">
        <Header />
        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyIdeas.map((idea) => (
            <Link
              key={idea.id}
              href={`/ideaboard/${idea.id}`}
              className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-4 shadow hover:scale-105 transition-all"
            >
              <h2 className="text-lg font-semibold">{idea.title}</h2>
              <p className="text-sm text-gray-500">Click to open</p>
            </Link>
          ))}
        </main>
      </div>
    </>
  )
}

export default IdeaBoard
