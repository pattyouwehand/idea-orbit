"use client"

import { useState } from "react"
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

export function DndTodoList({
  todos,
  setTodos,
}: {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}) {
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id)
      const newIndex = todos.findIndex((t) => t.id === over.id)
      setTodos(arrayMove(todos, oldIndex, newIndex))
    }
  }

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
        className="p-3 rounded-md mb-2 bg-gray-700 cursor-grab"
        style={style}
      >
        {todo.title}
      </li>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <ul>
          {todos.map((todo) => (
            <SortableItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
