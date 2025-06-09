"use client"
import { useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Editor = ({ ideaId }: { ideaId: string }) => {
  const [content, setContent] = useState("")

  return (
    <div>
      <textarea
        className="w-full h-64 p-4 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your idea here..."
      />

      {/* Simulated file upload + image */}
      <div className="mt-4 flex flex-col gap-2">
        <input type="file" className="block" />
        <input
          type="text"
          placeholder="Paste image URL"
          className="border rounded px-3 py-2"
        />
      </div>
    </div>
  )
}

export default Editor
