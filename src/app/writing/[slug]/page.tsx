import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, ScrollProgress, WordsIn } from "@/components/motion";
import { formatDate, getPost, posts } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/posts/${slug}.mdx`);
  const index = posts.indexOf(post);
  const older = posts[index + 1];
  const newer = posts[index - 1];

  return (
    <article className="mx-auto max-w-2xl px-5 pt-36 sm:px-8">
      <ScrollProgress />
      <Reveal y={8}>
        <Link href="/writing" className="font-mono text-xs text-dim hover:text-fg">
          ← all writing
        </Link>
      </Reveal>
      <h1 className="mt-8 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-fg">
        <WordsIn text={post.title} delay={0.05} />
      </h1>
      <Reveal delay={0.3} y={8}>
        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-dim">
          <span>{formatDate(post.date)}</span>
          {post.tags.map((t) => (
            <span key={t} className="rounded-full border border-line px-2 py-0.5">
              {t}
            </span>
          ))}
          {post.draft && <span className="text-accent">in progress</span>}
        </div>
      </Reveal>

      <Reveal delay={0.4} y={16}>
        <div className="prose mt-14">
          <Body />
        </div>
      </Reveal>

      <p className="mt-16 text-center text-sm italic text-dim">
        Got thoughts or suggestions? My DMs are open.
      </p>

      <nav className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {older ? (
          <Link href={`/writing/${older.slug}`} className="group rounded-2xl border border-line p-5 hover:border-muted">
            <span className="font-mono text-[11px] text-dim">← older</span>
            <span className="mt-1 block text-fg">{older.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link
            href={`/writing/${newer.slug}`}
            className="group rounded-2xl border border-line p-5 text-right hover:border-muted"
          >
            <span className="font-mono text-[11px] text-dim">newer →</span>
            <span className="mt-1 block text-fg">{newer.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
