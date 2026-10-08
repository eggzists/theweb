import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { PostList } from "@/components/post-list";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on tech, physics, philosophy and the in-between moments.",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-20 sm:px-6">
      <Reveal>
        <h1 className="font-serif text-5xl text-fg">Writing</h1>
        <p className="mt-4 text-lg text-muted">
          Tech, creativity, philosophy and the occasional existential crisis. Some posts come with
          a song to read along to (marked ♪).
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-14">
        <PostList posts={posts} searchable />
      </Reveal>
    </div>
  );
}
