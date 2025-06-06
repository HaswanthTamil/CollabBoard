import { notFound } from "next/navigation"
import Header from "@/components/nonreusable-ui/Header"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

// export async function generateStaticParams() {
//   const posts = await fetch("https://.../posts").then((res) => res.json())

//   return posts.map((post: any) => ({
//     slug: post.slug,
//   }))
// }

const NotePage = async ({ params }: PageProps) => {
  const { slug } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/note/${slug}`,
    {
      cache: "no-store",
    },
  )

  if (!res.ok) return notFound()

  const note = await res.json()

  return (
    <div>
      <Header />
      <main className="p-4 max-w-3xl m-5 sm:mx-auto dark:bg-gray-950 border border-gray-700 rounded-md shadow-sm shadow-gray-800 mb-20">
        <h1 className="text-2xl font-bold dark:text-white">{note.title}</h1>
        <div className="text-sm text-gray-400 mb-2">
          <time dateTime={note.updatedAt}>
            {new Date(note.updatedAt).toLocaleString()}
          </time>
          {note.pinned && (
            <span className="ml-2 bg-yellow-300 text-black px-2 py-1 rounded">
              :pushpin: Pinned
            </span>
          )}
        </div>
        <section className="text-black dark:text-white py-2">
          <p>{note.content}</p>
        </section>
        <section className="mt-4 flex flex-wrap gap-2">
          {note.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
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
