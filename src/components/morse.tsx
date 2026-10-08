"use client";

import { useState } from "react";
import { findEgg } from "@/lib/eggs";

/** The footer's sign-off. Tap it and it answers back. */
export function Morse() {
  const [decoded, setDecoded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setDecoded(true);
        findEgg("morse");
      }}
      className="mt-8 block cursor-default font-mono text-xs text-dim"
      title="Morse for E N D"
    >
      {decoded ? "E N D … or is it? .-- . .-.. -.-. --- -- ." : ". -. -.."}
    </button>
  );
}
