import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BrowserFrame, PhoneFrame } from "@/components/frames";
import { Reveal } from "@/components/motion";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.name, description: project.pitch } : {};
}

// Same shape as the post pages: the shell renders at once, the project reads `params` inside Suspense.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <article className="mx-auto max-w-2xl px-5 pt-20 sm:px-6">
      <Suspense fallback={<div className="min-h-[60svh]" />}>
        <ProjectContent params={params} />
      </Suspense>
    </article>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6 font-serif text-3xl text-fg">{children}</h2>;
}

async function ProjectContent({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const desktop = project.shots.filter((s) => s.device === "desktop");
  const mobile = project.shots.filter((s) => s.device === "mobile");

  return (
    <>
      <Reveal>
        <Link href="/projects" className="text-sm text-muted hover:text-fg">
          ← projects
        </Link>
        <p className="mt-8 text-sm text-dim">
          {project.kind} · {project.status} · {project.year}
        </p>
        <h1 className="mt-2 font-serif text-6xl leading-none text-fg sm:text-7xl">{project.name}</h1>
        <p className="mt-5 text-xl leading-relaxed text-soft">{project.pitch}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-fg px-4 py-2 text-bg transition-opacity hover:opacity-85"
            >
              Visit {project.live.replace(/^https?:\/\//, "")} ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-4 py-2 text-fg hover:border-muted"
            >
              Source ↗
            </a>
          )}
        </div>
      </Reveal>

      {desktop[0] && (
        <Reveal delay={0.1} className="mt-14 lg:-mx-20">
          <BrowserFrame shot={desktop[0]} url={project.live} eager />
        </Reveal>
      )}

      <Reveal className="mt-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          {project.facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-serif text-4xl text-fg">{f.value}</dd>
              <dd className="mt-1 text-sm leading-snug text-muted">{f.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mt-20">
        <Heading>The problem</Heading>
        <p className="text-lg leading-relaxed text-soft">{project.problem}</p>
      </Reveal>

      <Reveal className="mt-20">
        <Heading>What I built</Heading>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {project.features.map((f, i) => (
            <div key={f.title}>
              <p className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {(mobile.length > 0 || desktop.length > 1) && (
        <Reveal className="mt-20">
          <Heading>Screens</Heading>
          {project.shotsNote && <p className="-mt-3 mb-6 text-muted">{project.shotsNote}</p>}

          {desktop.slice(1).map((shot) => (
            <figure key={shot.alt} className="mb-12 lg:-mx-20">
              <BrowserFrame shot={shot} url={project.live} />
              {shot.caption && <figcaption className="mt-3 text-sm text-dim">{shot.caption}</figcaption>}
            </figure>
          ))}

          {mobile.length > 0 && (
            <div className="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-6 sm:px-6 lg:-mx-20 lg:px-0">
              <div className="flex gap-6">
                {mobile.map((shot) => (
                  <figure key={shot.alt} className="w-56 shrink-0 sm:w-60">
                    <PhoneFrame shot={shot} />
                    {shot.caption && (
                      <figcaption className="mt-3 text-sm leading-snug text-dim">{shot.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      )}

      <Reveal className="mt-20">
        <Heading>Calls that shaped it</Heading>
        <ol className="space-y-5">
          {project.decisions.map((d, i) => (
            <li key={d} className="grid grid-cols-[2.5rem_1fr] items-baseline">
              <span className="font-serif text-2xl italic text-accent">{i + 1}</span>
              <span className="text-lg leading-relaxed text-soft">{d}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-20">
        <Heading>Built with</Heading>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-3 py-1 text-sm text-soft">
              {s}
            </li>
          ))}
        </ul>
      </Reveal>

      {next !== project && (
        <nav className="mt-24 border-t border-line pt-6">
          <p className="text-sm text-dim">Next project</p>
          <Link href={`/projects/${next.slug}`} className="group mt-1 block">
            <span className="font-serif text-3xl text-fg underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-accent">
              {next.name} →
            </span>
            <span className="mt-1 block text-muted">{next.pitch}</span>
          </Link>
        </nav>
      )}
    </>
  );
}
