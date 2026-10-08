"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { eggs, type EggId } from "@/content/eggs";
import { FOUND, findEgg, useFoundEggs } from "@/lib/eggs";
import { ease } from "./motion";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/**
 * Site-wide easter eggs (the Konami code, a note in the console, late-night visits),
 * plus the toast that pops up whenever any egg on any page is found.
 */
export function EggHunt() {
  const found = useFoundEggs();
  const [toast, setToast] = useState<EggId | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onFound = (e: Event) => {
      setToast((e as CustomEvent<EggId>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 5000);
    };
    window.addEventListener(FOUND, onFound);
    return () => {
      window.removeEventListener(FOUND, onFound);
      clearTimeout(timer);
    };
  }, []);

  // ↑ ↑ ↓ ↓ ← → ← → B A: the page does a barrel roll.
  useEffect(() => {
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress < KONAMI.length) return;
      progress = 0;
      const root = document.documentElement;
      root.classList.remove("barrel-roll");
      void root.offsetWidth; // restart the animation if it's already run
      root.classList.add("barrel-roll");
      findEgg("konami");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // A note for whoever opens the dev tools.
  useEffect(() => {
    const w = window as typeof window & { tinu?: { hello: () => string } };
    if (w.tinu) return;
    w.tinu = {
      hello() {
        findEgg("console");
        return "Hey, curious one. You found the backstage. There are more of these hidden around the site.";
      },
    };
    console.log(
      "%cpsst.%c You look like someone who reads the source.\nType tinu.hello() and press Enter.",
      "font: italic 22px Georgia, serif; color: #a4532f",
      "font: 13px ui-monospace, monospace",
    );
  }, []);

  // Between midnight and 4am, local time.
  useEffect(() => {
    if (new Date().getHours() < 4) findEgg("night-owl");
  }, []);

  const egg = eggs.find((e) => e.id === toast);

  return (
    <AnimatePresence>
      {egg && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.2, ease } }}
          className="fixed bottom-4 left-4 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-line bg-bg/95 px-4 py-3 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.5)] backdrop-blur-md"
        >
          <p className="text-xs text-dim">
            Easter egg found · {found.length} of {eggs.length}
          </p>
          <p className="mt-0.5 font-serif text-xl text-fg">{egg.name}</p>
          <Link href="/found" onClick={() => setToast(null)} className="mt-1 inline-block text-sm text-accent hover:underline">
            see what you&apos;ve found →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
