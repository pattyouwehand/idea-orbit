import Navbar from "@/components/Navbar"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import BackgroundStars from "@/components/BackgroundStars"

export const metadata = {
  title: "IdeaOrbit",
  description: "Launchpad for ADHD brains"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="nl">
        <body className="bg-gray-900 text-gray-100">
          <BackgroundStars />
          <Navbar />
          <main className="relative">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}