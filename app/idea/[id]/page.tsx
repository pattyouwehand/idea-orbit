"use client"

import { useState } from "react"
import { ArrowLeft, Send } from "lucide-react"

export default function IdeaDetail() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey 👋 Wat tof dat je met dit idee bezig bent! Waar wil je vandaag aan werken?" },
  ])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    if (!res.body) {
      // fallback: volledige response in één keer
      const text = await res.text();
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let assistantText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      assistantText += decoder.decode(value, { stream: true });
      // update het laatste assistant-bericht realtime (replace of append)
      setMessages((prev) => {
        // filter eventuele oude assistant draft
        const withoutDraft = prev.filter((m) => m.role !== "assistant" || m.content !== assistantText);
        return [...withoutDraft, { role: "assistant", content: assistantText }];
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex flex-col">
      <header className="flex items-center gap-3 mb-6">
        <a href="/dashboard" className="text-gray-400 hover:text-cyan-400 flex items-center gap-1">
          <ArrowLeft size={18} /> Terug
        </a>
      </header>

      <section className="max-w-4xl mx-auto bg-gray-900/80 rounded-2xl p-6 shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold mb-2">AI-tool voor Creatieven 🎨</h1>
        <p className="text-gray-400 mb-6">
          Status: <span className="text-cyan-400">In Progress</span> — Laten we wat structuur aanbrengen in dit idee!
        </p>

        {/* Momentum Tracker */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-1">Momentum</p>
          <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-2/3 transition-all"></div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-gray-800/60 rounded-xl p-4 h-[400px] overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[80%] ${
                m.role === "user" ? "ml-auto bg-cyan-500/80 text-black" : "bg-gray-700/80 text-gray-100"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Typ hier je volgende stap of vraag..."
            className="flex-1 p-3 rounded-xl bg-gray-800 text-gray-100 focus:outline-none border border-gray-700 focus:border-cyan-400"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}