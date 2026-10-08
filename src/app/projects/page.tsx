import type { Metadata } from "next";
import Link from "next/link";
import { BrowserFrame } from "@/components/frames";
import { Reveal } from "@/components/motion";
import { formatDate } from "@/content/posts";
import { coverShot, projects } from "@/content/projects";
import { teardowns } from "@/content/teardowns";
import { Patience } from "./patience";

export const metadata: Metadata = {
  title: "Projects",
  description: "Products I've built and shipped, and teardowns of products I admire.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-20 sm:px-6">
      <Reveal>
        <h1 className="font-serif text-5xl text-fg">Projects</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Things I&apos;ve taken from a messy note to something real people use. Each one has a short
          case study: the problem, what I built, and the calls that shaped it.
        </p>
      </Reveal>

      <div className="mt-16 space-y-24">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={0.05 * i}>
            <article>
              <Link href={`/projects/${p.slug}`} className="group block lg:-mx-20">
                <div className="transition-transform duration-500 group-hover:-translate-y-1">
                  <BrowserFrame shot={coverShot(p)} url={p.live} eager={i === 0} />
                </div>
              </Link>

              <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="font-serif text-4xl text-fg">
                  <Link href={`/projects/${p.slug}`} className="hover:text-accent">
                    {p.name}
                  </Link>
                </h2>
                <p className="text-sm text-dim">
                  {p.kind.toLowerCase()} · {p.status.toLowerCase()} · {p.year}
                </p>
              </div>
              <p className="mt-3 text-lg leading-relaxed text-soft">{p.pitch}</p>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
                {p.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="font-serif text-3xl text-fg">{f.value}</dd>
                    <dd className="mt-1 text-xs leading-snug text-muted">{f.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <ul className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-5 text-sm">
                  <Link href={`/projects/${p.slug}`} className="link">
                    case study →
                  </Link>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
                      visit ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-28">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-3xl text-fg">Teardowns</h2>
          <span className="text-sm text-dim">products I didn&apos;t build, taken apart</span>
        </div>
        {teardowns.length > 0 ? (
          <ul className="divide-y divide-line border-y border-line">
            {teardowns.map((t) => (
              <li key={t.slug} className="py-5">
                <a href={t.href} target="_blank" rel="noreferrer" className="group block">
                  <span className="font-serif text-2xl text-fg underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-accent">
                    {t.title}
                  </span>
                  <span className="mt-1 block text-sm text-dim">
                    {t.product} · {formatDate(t.date)}
                  </span>
                  <span className="mt-2 block text-muted">{t.excerpt}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-line px-6 py-8">
            <p className="font-serif text-2xl text-fg">The first one is on the workbench.</p>
            <p className="mt-2 leading-relaxed text-muted">
              Breakdowns of products I use every day: who they&apos;re for, why they work, where
              they don&apos;t, and what I&apos;d build next if they were mine.
            </p>
            <Patience />
          </div>
        )}
      </Reveal>
    </div>
  );
}
