"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { EggId } from "@/content/eggs";

const KEY = "eggs-found";
const CHANGE = "eggs:change";
export const FOUND = "eggs:found";

// Used when storage is unavailable (private mode, blocked site data), so finds still count this visit.
let memory = "";

function read() {
  try {
    return localStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The ids of the eggs this visitor has found, remembered on their device. */
export function useFoundEggs(): string[] {
  const raw = useSyncExternalStore(subscribe, read, () => "");
  return useMemo(() => raw.split(",").filter(Boolean), [raw]);
}

/** Marks an egg as found. Announces it the first time only. */
export function findEgg(id: EggId) {
  const found = read().split(",").filter(Boolean);
  if (found.includes(id)) return;
  memory = [...found, id].join(",");
  try {
    localStorage.setItem(KEY, memory);
  } catch {
    // Falls back to `memory`.
  }
  window.dispatchEvent(new Event(CHANGE));
  window.dispatchEvent(new CustomEvent<EggId>(FOUND, { detail: id }));
}
