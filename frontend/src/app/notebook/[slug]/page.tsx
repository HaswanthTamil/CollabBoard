// src/app/notebook/[slug]/page.tsx

import Header from "@/components/nonreusable-ui/Header"
import { notFound } from "next/navigation"

const NotePage = async ({ params }: { params: { slug: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/note/${params.slug}`,
    {
      cache: "no-store",
      // headers for auth if needed
    },
  )

  if (!res.ok) return notFound()

  const note = await res.json()

  return (
    <div>
      <Header />
      <main
        className="p-4 max-w-3xl m-5 sm:mx-auto dark:bg-gray-950 border border-gray-700 rounded-md shadow-sm shadow-gray-800 mb-20"
        role="main"
        aria-labelledby="note-title"
      >
        <h1 id="note-title" className="text-2xl font-bold dark:text-white">
          {note.title}
        </h1>

        <div className="text-sm text-gray-400 mb-2" aria-label="Note metadata">
          <time dateTime={note.updatedAt}>
            {new Date(note.updatedAt).toLocaleString()}
          </time>
          {note.pinned && (
            <span
              className="ml-2 bg-yellow-300 text-black px-2 py-1 rounded"
              aria-label="Pinned note"
              title="Pinned"
            >
              📌 Pinned
            </span>
          )}
        </div>

        <section
          className="text-black dark:text-white py-2"
          aria-label="Note content"
        >
          <p>{note.content}</p>
        </section>

        <section className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {note.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
              aria-label={`Tag: ${tag}`}
            >
              #{tag}
            </span>
          ))}
        </section>
      </main>
    </div>
  )
}

export default NotePage
