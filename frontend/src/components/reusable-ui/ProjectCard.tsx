import { ClipboardList, Loader2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { JSX } from "react"

interface Task {
  _id: string
  title: string
  status: "todo" | "in-progress" | "done" | "cancelled"
  color?: string
  icon?: "ClipboardList" | "Loader2" | "CheckCircle" | "XCircle"
}

interface ProjectCardProps {
  title: string
  tasks: Task[]
}

const iconMap: Record<string, JSX.Element> = {
  ClipboardList: (
    <ClipboardList className="w-4 h-4 text-gray-600" aria-hidden="true" />
  ),
  Loader2: (
    <Loader2
      className="w-4 h-4 text-yellow-500 animate-spin"
      aria-hidden="true"
    />
  ),
  CheckCircle: (
    <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
  ),
  XCircle: <XCircle className="w-4 h-4 text-red-500" aria-hidden="true" />,
}

const ProjectCard = ({ title, tasks }: ProjectCardProps) => {
  return (
    <Link href="/projectboard/id" aria-label="Open project: CollabBoard MVP">
      <div className="flex justify-center rounded-lg mx-5 sm:mx-0 p-2 h-full">
        <section
          className="bg-white border-2 border-gray-500 dark:border-gray-400 rounded-2xl p-5 overflow-y-auto hide-scrollbar dark:bg-gray-950 hover:transform hover:scale-105 transition-all duration-300 ease-out"
          role="region"
          aria-labelledby={`project-title-${title}`}
        >
          <h2
            id={`project-title-${title}`}
            className="text-xl font-bold mb-4 dark:text-white"
          >
            {title}
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet.</p>
          ) : (
            <ul className="space-y-2" role="list">
              {tasks.map((task) => (
                <li key={task._id} className="flex items-center gap-2">
                  {task.icon && iconMap[task.icon]}
                  <span
                    className={`text-lg ${
                      task.status === "done"
                        ? "text-green-400"
                        : task.status === "in-progress"
                          ? "text-yellow-400"
                          : task.status === "todo"
                            ? "text-gray-600 dark:text-gray-100"
                            : "text-red-500"
                    }`}
                  >
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Link>
  )
}

export default ProjectCard
