// to be deleted after testing
import ProjectCard from "./ProjectCard"

const TestProjectCard = () => {
  return (
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
  )
}

export default TestProjectCard
