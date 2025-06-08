import Header from "@/components/nonreusable-ui/Header"
import ProjectCard from "@/components/reusable-ui/ProjectCard"

const ProjectBoard = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main
          className="flex-1 flex-col py-2 gap-2 dark:bg-black overflow-auto"
          role="main"
          aria-labelledby="project-board-title"
        >
          <h1 id="project-board-title" className="sr-only">
            Project Board
          </h1>

          <section aria-label="Project list">
            <ProjectCard
              title="CollabBoard MVP"
              tasks={[
                {
                  _id: "1",
                  title: "Setup schema lorem ipsum dolar set amet",
                  status: "done",
                  icon: "CheckCircle",
                },
                {
                  _id: "2",
                  title: "Build UI",
                  status: "in-progress",
                  icon: "Loader2",
                },
                {
                  _id: "3",
                  title: "Deploy backend",
                  status: "todo",
                  icon: "ClipboardList",
                },
                {
                  _id: "4",
                  title: "Go for a walk",
                  status: "cancelled",
                  icon: "XCircle",
                },
                {
                  _id: "5",
                  title: "Go for a walk",
                  status: "cancelled",
                  icon: "XCircle",
                },
                {
                  _id: "6",
                  title: "Go for a walk",
                  status: "cancelled",
                  icon: "XCircle",
                },
                {
                  _id: "7",
                  title: "Go for a walk",
                  status: "cancelled",
                  icon: "XCircle",
                },
              ]}
            />
          </section>
        </main>
      </div>
    </>
  )
}

export default ProjectBoard
