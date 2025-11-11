"use client"

import { DndTodoList } from "@/components/DndTodoList";
import TodoSidebar from "@/components/TodoSidebar"
import { useState } from "react"

type Todo = { id: string; title: string }

const initialTodos: Todo[] = [
  { id: "1", title: "Nieuwe blogpost schrijven" },
  { id: "2", title: "Mini-product idee uitwerken" },
  { id: "3", title: "AI-tool concept schetsen" },
  { id: "4", title: "Marketingplan brainstorm" },
  { id: "5", title: "Website wireframe maken" },
  { id: "6", title: "Feedback verzamelen" },
  { id: "7", title: "Social posts plannen" },
]

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Alle Todo’s</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar preview links (optioneel) */}
        <div className="lg:col-span-1">
          <TodoSidebar todos={todos} />
        </div>

        {/* Todo lijst midden/rechts */}
        <div className="lg:col-span-2 bg-gray-800 p-4 rounded-xl shadow-md">
          <DndTodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  )
}
