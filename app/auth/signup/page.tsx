import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-800">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
            },
            variables: { colorPrimary: "#22d3ee" }
          }}
          path="/auth/signup"
          routing="path"
          signInUrl="/auth/signin"
        />
      </div>
    </main>
  )
}