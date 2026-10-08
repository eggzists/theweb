"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { quotes } from "@/content/quotes";
import { ease } from "./motion";

/** Click (or press Enter/Space) to step through the quotes. */
export function QuoteCycler({ large = false }: { large?: boolean }) {
  const [i, setI] = useState(0);
  const quote = quotes[i];
  const next = () => setI((n) => (n + 1) % quotes.length);

  return (
    <button
      type="button"
      onClick={next}
      className="group block w-full cursor-pointer text-left"
      aria-label="Show the next quote"
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease }}
        >
          <blockquote
            className={`font-serif italic leading-[1.15] tracking-[-0.01em] text-fg ${
              large ? "text-[clamp(2rem,5.5vw,4.2rem)]" : "text-[clamp(1.7rem,4vw,3rem)]"
            }`}
          >
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-fg">— {quote.author}</span>
            <span className="font-mono text-xs text-dim">{quote.context}</span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-dim transition-colors group-hover:text-accent">
        {String(i + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")} · click for another
      </span>
    </button>
  );
}
