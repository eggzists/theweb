"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { formatDate, type Post } from "@/content/posts";
import { ease } from "./motion";

export function PostList({ posts, searchable = false }: { posts: Post[]; searchable?: boolean }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = q
    ? posts.filter((p) =>
        [p.title, p.excerpt, ...p.tags].some((s) => s.toLowerCase().includes(q)),
      )
    : posts;

  return (
    <div>
      {searchable && (
        <label className="mb-6 flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-2.5 focus-within:border-muted">
          <span className="font-mono text-xs text-dim">/</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, tags…"
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-dim"
          />
        </label>
      )}

      <ul className="border-t border-line">
        <AnimatePresence initial={false}>
          {shown.map((post) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="border-b border-line"
            >
              <Link
                href={`/writing/${post.slug}`}
                className="group grid gap-1 py-6 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs text-dim">{formatDate(post.date)}</span>
                <span>
                  <span className="flex items-center gap-2 text-xl font-medium tracking-[-0.02em] text-fg transition-transform duration-300 group-hover:translate-x-1">
                    {post.title}
                    {post.draft && (
                      <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] font-normal text-dim">
                        in progress
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{post.excerpt}</span>
                </span>
                <span className="hidden text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:block">
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {shown.length === 0 && (
        <p className="py-10 text-center font-mono text-sm text-dim">nothing here yet. try another word?</p>
      )}
    </div>
  );
}
