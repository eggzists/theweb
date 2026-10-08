"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/content/projects";
import { ease } from "./motion";

const statusStyle: Record<Project["status"], string> = {
  Live: "text-accent",
  Building: "text-accent",
  Shipped: "text-soft",
  Client: "text-soft",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Pointer position within the card, 0..1.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [3, -3]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-3, 3]), { stiffness: 150, damping: 20 });
  const sx = useTransform(px, (v) => `${v * 100}%`);
  const sy = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${sx} ${sy}, hsl(${project.hue} 90% 60% / 0.16), transparent 65%)`;

  const href = project.live ?? project.repo;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay: (index % 2) * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full blur-3xl"
        style={{ background: `hsl(${project.hue} 90% 60% / 0.12)` }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            {String(index + 1).padStart(2, "0")} · {project.kind} · {project.year}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
            {project.name}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full border border-line bg-raise px-2.5 py-1 font-mono text-[11px] ${statusStyle[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <p className="relative mt-4 font-serif text-xl italic leading-snug text-soft sm:text-2xl">
        {project.pitch}
      </p>

      <div className="relative mt-6 grid gap-6 sm:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Problem</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">What I built</p>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded-md bg-raise px-2 py-0.5 font-mono text-[11px] text-muted">
              {s}
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-sm">
          {project.repo && project.live && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
              Code ↗
            </a>
          )}
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-fg underline decoration-accent underline-offset-4"
            >
              {project.live ? "Visit" : "Code"} ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
