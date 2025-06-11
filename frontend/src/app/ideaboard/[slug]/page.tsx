"use client"
import { useParams } from "next/navigation"
import Editor from "@/components/nonreusable-ui/Editor"

const IdeaPage = () => {
  const { id } = useParams()

  // Ensure id is a string
  const ideaId = typeof id === "string" ? id : Array.isArray(id) ? id[0] : ""

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-black text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Editing: {ideaId}</h1>
      <Editor ideaId={ideaId} />
    </div>
  )
}

export default IdeaPage
