import Link from "next/link";
import { Reveal } from "@/components/motion";
import { PostList } from "@/components/post-list";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { currentlyReading } from "@/content/reading";
import { site } from "@/content/site";

function Section({ title, children, more }: { title: string; children: React.ReactNode; more?: React.ReactNode }) {
  return (
    <Reveal className="mt-20">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl text-fg">{title}</h2>
        {more}
      </div>
      {children}
    </Reveal>
  );
}

export default function Home() {
  const reading = currentlyReading();

  return (
    <div className="mx-auto max-w-2xl px-5 pt-20 sm:px-6">
      <Reveal>
        <h1 className="font-serif text-5xl leading-tight text-fg sm:text-6xl">{site.name}</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-soft">
          <p>{site.intro}</p>
          <p>
            Right now I&apos;m building{" "}
            <Link className="link" href={`/projects/${projects[0].slug}`}>
              {projects[0].name}
            </Link>
            {reading && (
              <>
                {" "}and reading <em className="text-fg">{reading.title}</em>
              </>
            )}
            . I also <Link className="link" href="/writing">write</Link> about tech, physics and the
            in-between moments.
          </p>
        </div>
      </Reveal>

      <Section
        title="Building"
        more={
          <Link href="/projects" className="text-sm text-muted hover:text-fg">
            all projects →
          </Link>
        }
      >
        <ul className="divide-y divide-line border-y border-line">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6"
              >
                <span>
                  <span className="text-fg underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-accent">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{p.pitch}</span>
                </span>
                <span className="text-sm text-dim sm:text-right">
                  {p.status.toLowerCase()} · {p.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Writing"
        more={
          <Link href="/writing" className="text-sm text-muted hover:text-fg">
            all posts →
          </Link>
        }
      >
        <PostList posts={posts.slice(0, 4)} />
      </Section>

      <Section
        title="Reading"
        more={
          <Link href="/reading" className="text-sm text-muted hover:text-fg">
            bookshelf →
          </Link>
        }
      >
        <p className="text-soft">
          Books and other things I&apos;ve been reading, with a line on what stuck. See the{" "}
          <Link className="link" href="/reading">
            bookshelf
          </Link>
          .
        </p>
      </Section>
    </div>
  );
}
