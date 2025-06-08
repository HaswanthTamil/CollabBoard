import Header from "@/components/nonreusable-ui/Header"
import { ClipboardList, Loader2, CheckCircle, XCircle } from "lucide-react"
import { notFound } from "next/navigation"
import { JSX } from "react"

// Task Interface
interface Task {
  _id: string
  title: string
  status: "todo" | "in-progress" | "done" | "cancelled"
  color?: string
  icon?: "ClipboardList" | "Loader2" | "CheckCircle" | "XCircle"
}

// Project Interface
type Project = {
  title: string
  tasks: Task[]
}

// Icon map with accessible labels
const iconMap: Record<string, JSX.Element> = {
  ClipboardList: (
    <ClipboardList
      className="w-4 h-4 text-gray-600"
      aria-hidden="true"
      focusable="false"
    />
  ),
  Loader2: (
    <Loader2
      className="w-4 h-4 text-yellow-500 animate-spin"
      aria-hidden="true"
      focusable="false"
    />
  ),
  CheckCircle: (
    <CheckCircle
      className="w-4 h-4 text-green-600"
      aria-hidden="true"
      focusable="false"
    />
  ),
  XCircle: (
    <XCircle
      className="w-4 h-4 text-red-500"
      aria-hidden="true"
      focusable="false"
    />
  ),
}

// Mock data with proper type
const mockProjects: Record<string, Project> = {
  "marketing-launch": {
    title: "Marketing Launch",
    tasks: [
      {
        _id: "1",
        title: "Write blog",
        status: "todo",
        icon: "ClipboardList",
        color: "#f3f4f6",
      },
      {
        _id: "2",
        title: "Design banner",
        status: "in-progress",
        icon: "Loader2",
        color: "#fef9c3",
      },
      {
        _id: "3",
        title: "Approve assets",
        status: "done",
        icon: "CheckCircle",
        color: "#dcfce7",
      },
      {
        _id: "4",
        title: "Drop old idea",
        status: "cancelled",
        icon: "XCircle",
        color: "#fee2e2",
      },
    ],
  },
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug
  const project = mockProjects[slug]

  if (!project) return notFound()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="p-6 dark:bg-black flex-grow"
        role="main"
        aria-labelledby="project-title"
      >
        <h1
          id="project-title"
          className="text-2xl dark:text-white font-bold mb-4"
        >
          {project.title}
        </h1>

        <section className="space-y-3 max-w-lg" aria-label="Task list">
          {project.tasks.map((task) => (
            <article
              key={task._id}
              className={`font-medium flex items-center gap-3 rounded-lg p-3 ${
                task.status === "done"
                  ? "bg-green-200"
                  : task.status === "in-progress"
                    ? "bg-yellow-200"
                    : task.status === "todo"
                      ? "bg-gray-700 dark:bg-gray-200"
                      : "bg-red-200"
              }`}
              role="group"
              aria-label={`Task: ${task.title}, Status: ${task.status}`}
            >
              {task.icon && iconMap[task.icon]}
              <p className={"text-lg dark:text-black"}>{task.title}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
