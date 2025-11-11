'use client'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-3 px-24 backdrop-blur-md">
      <div>
        <Link href="/" className="text-white">
          <h1 className="text-4xl font-bold mb-2">
            IdeaOrbit 🚀
          </h1>
        </Link>
        <p className="text-white">Launchpad for ADHD brains</p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-gray-300 hover:text-cyan-400 transition-colors"
        >
          Dashboard
        </Link>

        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "ring-2 ring-cyan-400"
            }
          }}
        />
      </div>
    </nav>
  )
}