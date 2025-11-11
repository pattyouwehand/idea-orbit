export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900 text-gray-100 flex flex-col items-center justify-center">
      <p className="text-lg text-gray-400 mb-10 text-center max-w-md">
        Launchpad for ADHD brains — zet je ideeën neer, geef ze structuur en laat ze groeien.
      </p>
      <div className="flex gap-4">
        <a
          href="/dashboard"
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl shadow-lg transition-all"
        >
          Start direct
        </a>
        <a
          href="/auth/signin"
          className="px-6 py-3 border border-gray-600 rounded-xl text-gray-300 hover:border-cyan-400 transition-all"
        >
          Log in
        </a>
      </div>
    </main>
  )
}