import { auth } from "@clerk/nextjs/server"
import IdeaDashboard from "@/components/IdeaDashboard"

export default async function DashboardPage() {
  const { userId } = await auth()

  return (
    <>
      {userId ? (
        <div className="mx-24">
          {/* TODO: later hier echte user data tonen */}
          <IdeaDashboard />
        </div>
      ) : (
        <div className="mx-24">
          <div className="max-w-xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">IdeaOrbit 🚀</h1>
            <p className="text-gray-400 mb-6">
              Probeer het even uit — geen account nodig 💡
            </p>
            <a
              href="/auth/signin"
              className="inline-block px-5 py-3 bg-cyan-500 text-black rounded-xl hover:bg-cyan-400 font-semibold transition-all"
            >
              Log in om je ideeën te bewaren
            </a>
          </div>
          <IdeaDashboard />
        </div>
      )}
    </>
  )
}