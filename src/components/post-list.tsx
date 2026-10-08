"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate, type Post } from "@/content/posts";
import { findEgg } from "@/lib/eggs";

export function PostList({ posts, searchable = false }: { posts: Post[]; searchable?: boolean }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = q
    ? posts.filter((p) => [p.title, p.excerpt, ...p.tags].some((s) => s.toLowerCase().includes(q)))
    : posts;
  const isAnswer = q === "42";

  useEffect(() => {
    if (isAnswer) findEgg("answer");
  }, [isAnswer]);

  return (
    <div>
      {searchable && (
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts"
          aria-label="Search posts"
          className="mb-8 w-full border-b border-line bg-transparent pb-2 text-fg outline-none placeholder:text-dim focus:border-muted"
        />
      )}

      <ul className="space-y-8">
        {shown.map((post) => (
          <li key={post.slug}>
            <Link href={`/writing/${post.slug}`} className="group block">
              <span className="font-serif text-2xl leading-snug text-fg underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-accent">
                {post.title}
              </span>
              <span className="mt-1 block text-sm text-dim">
                {formatDate(post.date)}
                {post.tags.length > 0 && <> · {post.tags.join(", ")}</>}
                {post.music && <> · ♪</>}
                {post.draft && <> · in progress</>}
              </span>
              <span className="mt-2 block leading-relaxed text-muted">{post.excerpt}</span>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 &&
        (isAnswer ? (
          <p className="font-serif text-2xl text-fg">
            Don&apos;t panic. That&apos;s the answer; I&apos;m still working on the question.
          </p>
        ) : (
          <p className="text-dim">Nothing matches that. Try another word?</p>
        ))}
    </div>
  );
}
