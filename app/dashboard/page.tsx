import { useState } from "react"

const dummyIdeas = [
  { id: 1, title: "Nieuwe blogpost", status: "idea" },
  { id: 2, title: "Mini-product lancering", status: "concept" },
  { id: 3, title: "AI-tool voor creatieven", status: "in_progress" },
]

const statusColors: Record<string, string> = {
  idea: "bg-yellow-200",
  concept: "bg-blue-200",
  in_progress: "bg-green-200",
  launch_ready: "bg-purple-300",
}

export default function Dashboard() {
  const [ideas, setIdeas] = useState(dummyIdeas)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">IdeaOrbit 🚀</h1>
        <p className="text-gray-400">Launchpad for ADHD brains</p>
        <button className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded-md hover:bg-cyan-400">
          + Nieuw Idee
        </button>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className={`p-4 rounded-xl shadow-md ${statusColors[idea.status]} hover:scale-105 transition-transform cursor-pointer`}
          >
            <h2 className="text-xl font-semibold">{idea.title}</h2>
            <p className="mt-2 text-gray-700">Status: {idea.status}</p>
            <div className="mt-4 h-2 w-full bg-gray-300 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${statusColors[idea.status]}`}
                style={{
                  width:
                    idea.status === "idea"
                      ? "10%"
                      : idea.status === "concept"
                      ? "40%"
                      : idea.status === "in_progress"
                      ? "70%"
                      : "100%"
                }}
              />
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}