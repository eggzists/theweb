"use client";

import { motion } from "motion/react";

/** Endless horizontal ticker. The list is rendered twice so the loop is seamless. */
export function Marquee({ items }: { items: readonly string[] }) {
  return (
    <div className="relative overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-sm text-muted" aria-hidden={i >= items.length}>
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
