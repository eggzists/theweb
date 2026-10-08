"use client";

import { useState } from "react";
import { findEgg } from "@/lib/eggs";

const outcomes = [
  "Still doesn't exist. Measurement is consistent, at least.",
  "Collapsed again. Same result. Physics is holding up.",
  "For a moment there, it almost existed.",
  "You're very persistent. Schrödinger would approve.",
];

/** Lets visitors on the 404 page "measure" the missing page again. */
export function ObserveAgain() {
  const [n, setN] = useState(-1);

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={() => {
          setN((n + 1) % outcomes.length);
          findEgg("observer");
        }}
        className="text-sm text-dim transition-colors hover:text-muted"
      >
        observe again
      </button>
      {n >= 0 && (
        <p role="status" className="mt-2 font-serif text-xl text-fg">
          {outcomes[n]}
        </p>
      )}
    </div>
  );
}
