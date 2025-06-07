"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface Card {
  _id: string
  title: string
  content: string
}

const ProjectCard = () => {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch("http://localhost:5000/api/cards")
      const data = await res.json()
      setCards(data)
    }

    fetchCards()
  }, [])

  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Link href={`/card/${card._id}`} key={card._id}>
          <div className="p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900 hover:shadow-lg cursor-pointer transition-all">
            <h2 className="font-bold text-lg">{card.title}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 truncate">
              {card.content}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProjectCard
