"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { quotes } from "@/content/quotes";
import { findEgg } from "@/lib/eggs";

/** Click (or press Enter/Space) to step through the quotes. */
export function QuoteCycler() {
  const [i, setI] = useState(0);
  const quote = quotes[i];

  return (
    <button
      type="button"
      onClick={() => {
        // Clicking past the last quote means they've read every one.
        if (i === quotes.length - 1) findEgg("quotes");
        setI((i + 1) % quotes.length);
      }}
      className="group block w-full cursor-pointer text-left"
      aria-label="Show the next quote"
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <blockquote className="font-serif text-4xl leading-tight text-fg sm:text-5xl">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-muted">
            {quote.author} <span className="text-dim">· {quote.context}</span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      <span className="mt-10 block text-sm text-dim transition-colors group-hover:text-muted">
        {i + 1} of {quotes.length}. Click for another.
      </span>
    </button>
  );
}
