"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useMemo } from "react"

type IdeaCardProps = {
  title: string
  description?: string
  status: "idea" | "concept" | "in_progress" | "launch_ready"
  image?: string
  category?: string
}

const statusColors: Record<IdeaCardProps["status"], string> = {
  idea: "from-yellow-400 to-yellow-600",
  concept: "from-blue-400 to-blue-600",
  in_progress: "from-green-400 to-green-600",
  launch_ready: "from-purple-400 to-purple-600",
}

export default function IdeaCard({
  title,
  description = "Nog geen beschrijving toegevoegd.",
  status,
  image,
  category
}: IdeaCardProps) {
  const fallbackImage = useMemo(() => {
    const keywords = encodeURIComponent(title.toLowerCase())
    return (
      image ||
      `https://source.unsplash.com/400x300/?startup,space,creativity,${keywords}`
    )
  }, [title, image])

  const progressWidth =
    status === "idea"
      ? "10%"
      : status === "concept"
      ? "40%"
      : status === "in_progress"
      ? "70%"
      : "100%"

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:border-cyan-400/40 hover:shadow-cyan-400/20 transition-all"
    >
      <div className="relative w-full h-40">
        <Image
          src={fallbackImage}
          alt={title}
          fill
          className="object-cover opacity-90"
          unoptimized
        />
        <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-sm">
          {status.replace("_", " ")}
        </div>
        {category && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold text-gray-900 bg-gradient-to-r from-cyan-500 to-blue-500 bg-opacity-90`}>
            {category}
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-white text-xl font-semibold mb-1">{title}</h2>
        <p className="text-gray-300 text-sm mb-3 line-clamp-3">
          {description}
        </p>

        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${statusColors[status]}`}
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </motion.div>
  )
}
