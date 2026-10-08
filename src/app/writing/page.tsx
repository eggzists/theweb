import type { Metadata } from "next";
import { Reveal, WordsIn } from "@/components/motion";
import { PostList } from "@/components/post-list";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on tech, physics, philosophy and the in-between moments.",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-36 sm:px-8">
      <h1 className="text-[clamp(2.6rem,7vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] text-fg">
        <WordsIn text="Writing" />
        <span className="font-serif font-normal italic text-accent">
          <WordsIn text="& wondering" delay={0.15} />
        </span>
      </h1>
      <Reveal delay={0.3}>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Tech, creativity, philosophy and the occasional existential crisis. Structured chaos, one
          commit at a time.
        </p>
      </Reveal>
      <Reveal delay={0.4} className="mt-14">
        <PostList posts={posts} searchable />
      </Reveal>
    </div>
  );
}
