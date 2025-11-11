"use client"

import { useState } from "react"

type AddTodoProps = {
  onAdd: (title: string) => void
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim())
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nieuwe taak toevoegen..."
        className="flex-1 px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-cyan-500 rounded-md hover:bg-cyan-400 transition-all"
      >
        Toevoegen
      </button>
    </form>
  )
}
