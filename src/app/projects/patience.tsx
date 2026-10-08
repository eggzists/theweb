"use client";

import { useState } from "react";
import { findEgg } from "@/lib/eggs";

const replies = [
  "0 published",
  "still 0 published",
  "clicking won't make it faster",
  "okay, maybe a little faster",
  "I can hear you tapping",
  "writing, I promise",
  "fine. you win. it's coming.",
];

/** The teardown count. Pester it enough and it gives in. */
export function Patience() {
  const [n, setN] = useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        const next = Math.min(n + 1, replies.length - 1);
        setN(next);
        if (next === replies.length - 1) findEgg("patience");
      }}
      className="mt-5 font-mono text-xs text-dim transition-colors hover:text-muted"
    >
      {replies[n]}
    </button>
  );
}
