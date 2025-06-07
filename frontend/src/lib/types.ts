export type NoteCardProps = {
  id: number
  title: string
  content: string
  isOptionsOpen?: boolean
}

export type DotOptionsProps = {
  onClick: () => void
}

export type PageProps = {
  params: {
    slug: string
  }
}
