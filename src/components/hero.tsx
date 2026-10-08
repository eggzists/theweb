"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { WordsIn, ease } from "./motion";

const things = ["products", "platforms", "tools", "experiments", "side quests"];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % things.length), 2200);
    return () => clearInterval(id);
  }, []);

  // A soft accent glow that trails the cursor across the hero.
  const mx = useMotionValue(30);
  const my = useMotionValue(40);
  const x = useSpring(mx, { stiffness: 60, damping: 20 });
  const y = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${x}% ${y}%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)`;

  return (
    <section
      className="relative isolate flex min-h-[92svh] flex-col justify-center overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <div className="dot-grid absolute inset-0 -z-10" />
      <motion.div className="absolute inset-0 -z-10" style={{ background: glow }} />

      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Link
            href={site.now.href}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1 pl-2 pr-3 text-xs text-muted backdrop-blur hover:text-fg"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.now.label} <span className="text-fg">{site.now.project}</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>

        <h1 className="mt-8 text-[clamp(2.6rem,8vw,6.2rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-fg">
          <WordsIn text={`Hi, I'm ${site.name}.`} delay={0.1} />
          <br />
          <span className="text-muted">
            <WordsIn text="I build" delay={0.3} />
          </span>
          <span className="relative inline-flex pb-[0.12em] align-bottom [clip-path:inset(0_-100vw_0_0)]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={things[i]}
                className="inline-block font-serif font-normal italic tracking-[-0.02em] text-accent"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease }}
              >
                {things[i]}.
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          {site.intro}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease }}
        >
          <Link
            href="/#work"
            className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            See the work
          </Link>
          <Link
            href="/writing"
            className="rounded-full border border-line px-5 py-2.5 text-sm text-fg transition-colors hover:bg-raise"
          >
            Read the writing
          </Link>
          <span className="ml-1 font-mono text-xs text-dim">{site.location}</span>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { repeat: Infinity, duration: 2.4 } }}
      >
        scroll
      </motion.div>
    </section>
  );
}
