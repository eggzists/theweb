import Link from "next/link";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/motion";
import { PostList } from "@/components/post-list";
import { ProjectCard } from "@/components/project-card";
import { QuoteCycler } from "@/components/quote-cycler";
import { posts } from "@/content/posts";
import { experiments, projects } from "@/content/projects";
import { site } from "@/content/site";

const principles = [
  {
    title: "Start from the problem",
    body: "Every project above starts with a sentence about what's broken. If I can't write that sentence, I'm not ready to build.",
  },
  {
    title: "Ship the smallest real thing",
    body: "Cut the MVP until it hurts, put it in front of people, and let usage tell me what to build next.",
  },
  {
    title: "Decide once, write it down",
    body: "Product rules live next to the code, so I don't re-argue them and the next person doesn't have to guess.",
  },
  {
    title: "Design is part of the build",
    body: "Copy, empty states and the first 10 seconds get the same care as the database schema.",
  },
];

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-dim">
      <span className="text-accent">{n}</span>
      <span className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee items={site.stack} />

      <section id="work" className="mx-auto max-w-5xl scroll-mt-24 px-5 pt-28 sm:px-8">
        <Reveal>
          <SectionLabel n="01">Selected work</SectionLabel>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl">
            Products I&apos;ve designed, built and{" "}
            <span className="font-serif font-normal italic">shipped</span>.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-32 sm:px-8">
        <Reveal>
          <SectionLabel n="02">How I build</SectionLabel>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl">
            A few rules I keep <span className="font-serif font-normal italic">relearning</span>.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} y={16} className="h-full">
              <div className="h-full bg-surface p-7 sm:p-8">
                <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-xl font-medium tracking-[-0.02em] text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-32 sm:px-8">
        <Reveal>
          <SectionLabel n="03">Playground</SectionLabel>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl">
            Smaller builds &amp; <span className="font-serif font-normal italic">experiments</span>.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {experiments.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.05} y={12}>
              <a
                href={e.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-muted"
              >
                <span>
                  <span className="block font-medium text-fg">{e.name}</span>
                  <span className="block text-sm text-muted">{e.note}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-mono text-[11px] text-dim">{e.tag}</span>
                  <span className="text-dim transition-colors group-hover:text-accent">↗</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-32 sm:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionLabel n="04">Writing</SectionLabel>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl">
                Thinking <span className="font-serif font-normal italic">out loud</span>.
              </h2>
            </div>
            <Link href="/writing" className="shrink-0 text-sm text-muted hover:text-fg">
              All posts →
            </Link>
          </div>
        </Reveal>
        <Reveal className="mt-10">
          <PostList posts={posts.slice(0, 3)} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-32 sm:px-8">
        <Reveal>
          <SectionLabel n="05">On repeat</SectionLabel>
          <div className="mt-10">
            <QuoteCycler />
          </div>
        </Reveal>
      </section>
    </>
  );
}
