"use client";
import { motion } from "framer-motion";
import { LogIn, Sparkles } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 flex flex-col items-center justify-center px-6">
      {/* Floating orbs for soft background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold mb-4 text-center"
      >
        Welkom terug bij <span className="text-cyan-400">IdeaOrbit</span> 🚀
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-gray-400 mb-8 text-center max-w-md leading-relaxed"
      >
        Fijn dat je er weer bent! Log in om verder te bouwen aan je ideeën — of
        start lekker opnieuw met een frisse blik ✨
      </motion.p>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 shadow-lg shadow-black/40"
      >
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mailadres"
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-200 focus:border-cyan-400 focus:outline-none transition-all"
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-200 focus:border-cyan-400 focus:outline-none transition-all"
          />

          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl shadow-lg shadow-cyan-500/30 transition-all"
          >
            <LogIn size={18} />
            Inloggen
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3 text-sm text-gray-400 text-center">
          <button className="flex items-center justify-center gap-2 border border-gray-700 hover:border-cyan-400 px-4 py-2 rounded-xl transition-all">
            <Sparkles size={16} />
            Log in met Google
          </button>

          <p className="mt-3">
            Nog geen account?{" "}
            <a href="/auth/signup" className="text-cyan-400 hover:underline">
              Maak er eentje aan
            </a>
          </p>
        </div>
      </motion.div>

      {/* Footer link */}
      <motion.a
        href="/"
        className="absolute bottom-8 text-gray-500 hover:text-cyan-400 transition-all text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        ← Terug naar home
      </motion.a>
    </main>
  );
}
