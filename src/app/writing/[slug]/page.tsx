import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Reveal, ScrollProgress } from "@/components/motion";
import { MusicPlayer } from "@/components/music-player";
import { formatDate, getPost, posts } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

// The shell renders immediately on navigation; the post itself depends on the URL,
// so it reads `params` inside a Suspense boundary.
export default function PostPage({ params }: PageProps<"/writing/[slug]">) {
  return (
    <article className="mx-auto max-w-2xl px-5 pt-20 sm:px-6">
      <ScrollProgress />
      <Suspense fallback={<div className="min-h-[60svh]" />}>
        <PostContent params={params} />
      </Suspense>
    </article>
  );
}

async function PostContent({ params }: { params: PageProps<"/writing/[slug]">["params"] }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/posts/${slug}.mdx`);
  const index = posts.indexOf(post);
  const older = posts[index + 1];
  const newer = posts[index - 1];

  return (
    <>
      <Reveal>
        <header className="text-center">
          <h1 className="font-serif text-5xl leading-[1.1] text-fg sm:text-6xl">{post.title}</h1>
          <p className="mt-5 text-sm text-dim">
            {formatDate(post.date)}
            {post.tags.length > 0 && <> · {post.tags.join(", ")}</>}
            {post.draft && <> · in progress</>}
          </p>
          {post.music && (
            <p className="mt-2 text-sm text-dim">
              ♪ {post.music.title} · {post.music.artist}
            </p>
          )}
        </header>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="prose mt-14">
          <Body />
        </div>
      </Reveal>

      <p className="mt-16 text-center text-sm italic text-dim">
        Got thoughts or suggestions? My DMs are open.
      </p>

      <nav className="mt-12 flex justify-between gap-6 border-t border-line pt-6 text-sm">
        {older ? (
          <Link href={`/writing/${older.slug}`} className="text-muted hover:text-fg">
            ← {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link href={`/writing/${newer.slug}`} className="text-right text-muted hover:text-fg">
            {newer.title} →
          </Link>
        )}
      </nav>

      {post.music && <MusicPlayer key={post.slug} music={post.music} />}
    </>
  );
}
