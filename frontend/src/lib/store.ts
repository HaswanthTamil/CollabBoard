import { create } from "zustand"

interface StoreType {
  currentUser: string | null
  isLoading: boolean
  addTask: (task: string) => void
  removeTask: (task: string) => void
  publicProjects: string[]
  privateProjects: string[]
  recentProjects: string[]
}

const store = create<StoreType>((set) => ({
  currentUser: null,
  isLoading: false,
  addTask: (task: string) =>
    set((state) => ({
      publicProjects: [...state.publicProjects, task],
    })),
  removeTask: (task: string) =>
    set((state) => ({
      publicProjects: state.publicProjects.filter((t) => t !== task),
    })),
  publicProjects: [],
  privateProjects: [],
  recentProjects: [],
}))

export const useStore = store
