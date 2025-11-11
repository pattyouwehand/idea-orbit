"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Star = {
  id: number;
  x: number;
  y: number;
  endY: number;
  scale: number;
  duration: number;
  opacity: number;
};

export default function BackgroundStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // voorkomen dat Strict Mode dit dubbel initieert
    if (stars.length > 0) return;
    if (typeof window === "undefined") return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = 40;

    const arr: Star[] = Array.from({ length: count }).map((_, i) => {
      const startY = Math.random() * h;
      const endY = Math.random() * h; // target y — berekend nu en vast
      return {
        id: i,
        x: Math.random() * w,
        y: startY,
        endY,
        scale: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 15 + 8,
        opacity: Math.random() * 0.6 + 0.35,
      };
    });

    setStars(arr);
  }, [stars.length]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-gradient-to-b from-gray-900 via-gray-950 to-black overflow-hidden pointer-events-none"
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-cyan-300"
          style={{
            width: 2 * star.scale,
            height: 2 * star.scale,
            left: star.x,
            top: 0, // top is controlled by initial/animate y values
            willChange: "transform, opacity",
            opacity: star.opacity,
          }}
          initial={{ x: 0, y: star.y, scale: star.scale, opacity: star.opacity }}
          animate={{ y: [star.y, star.endY], opacity: [star.opacity, star.opacity * 0.4, star.opacity] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            // stagger-like random start (so they're not all in sync)
            delay: (star.id % 7) * 0.15,
          }}
        />
      ))}
    </div>
  );
}
