"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type Todo = { id: string; title: string }

type TodoSidebarProps = { todos: Todo[] }

function SortableItem({ todo }: { todo: Todo }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: todo.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`p-2 rounded-md bg-gray-700 mb-2 cursor-grab`}
      style={style}
    >
      {todo.title}
    </li>
  )
}

export default function TodoSidebar({ todos: initialTodos }: TodoSidebarProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id)
      const newIndex = todos.findIndex((t) => t.id === over.id)
      setTodos(arrayMove(todos, oldIndex, newIndex))
    }
  }

  return (
    <div className="lg:w-1/4 bg-gray-800 p-4 rounded-xl shadow-md sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Todo</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <ul>
            {todos.slice(0, 5).map((todo) => (
              <SortableItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <Link href="/todos">
        <button className="mt-4 w-full px-3 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-400 transition-all">
          Zie alles
        </button>
      </Link>
    </div>
  )
}
