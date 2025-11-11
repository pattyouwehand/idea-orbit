import IdeaCard from "@/components/IdeaCard"
import Link from "next/link"
import TodoSidebar from "./TodoSidebar"
import { dummyTodos } from "@/data/dummyTodos"

export default function IdeaDashboard() {
  type Idea = {
  id: number
  title: string
  description: string
  status: "idea" | "concept" | "in_progress" | "launch_ready"
  image?: string
  category?: string
}

  const dummyIdeas: Idea[] = [
    {
      id: 1,
      title: "T-shirts POD",
      category: "T-shirts",
      description: "Print on demand t-shirts.",
      status: "idea",
      image: "/images/tshirt.jpg",
    },
    {
      id: 2,
      title: "Boeken schrijven",
      category: "Ademwerk",
      description: "Boeken over ademwerk",
      status: "concept",
      image: "/images/writer.jpg"
    },
    {
      id: 3,
      title: "AI-tool voor creatieven",
      description: "Idee voor een AI die helpt structuur brengen in chaos.",
      status: "in_progress",
      image: "/images/brain.jpg"
    }
  ]

  return (
    <>
      <div className="mb-6 flex justify-start">
        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all">
          + Nieuw Idee
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mx-6">
      {/* LINKERZIJDE: Todo Sidebar */}
      <TodoSidebar todos={dummyTodos} />

    {/* RECHTS: Idea Cards */}
    <div className="lg:w-3/4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyIdeas.map((idea) => (
          <IdeaCard key={idea.id} {...idea} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
      <Link href="/ideas">
        <button className="px-4 py-2 bg-cyan-500 rounded-xl hover:bg-cyan-400 transition-all">
          Zie alles
        </button>
      </Link>
    </div>
    </div>
    </>
  )
}
