import Header from "@/components/nonreusable-ui/Header"
import TestProjectCard from "@/components/reusable-ui/TestProjectCard"

const ProjectBoard = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main
          className="flex-1 flex-col py-2 gap-2 overflow-auto"
          role="main"
          aria-labelledby="project-board-title"
        >
          <h1 id="project-board-title" className="sr-only">
            Project Board
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[25vh]">
            <TestProjectCard />
            <TestProjectCard />
            <TestProjectCard />
            <TestProjectCard />
            <TestProjectCard />
            <TestProjectCard />
          </div>
        </main>
      </div>
    </>
  )
}

export default ProjectBoard
