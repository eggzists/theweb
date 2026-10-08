export type Post = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  excerpt: string;
  tags: string[];
  draft?: boolean;
};

/**
 * Every post has a matching file at `src/content/posts/<slug>.mdx`.
 * Newest first.
 */
export const posts: Post[] = [
  {
    slug: "p-vs-np",
    title: "p vs np",
    date: "2025-07-01",
    excerpt:
      "One of the seven Millennium Prize Problems: can every problem whose answer is quick to check also be solved quickly?",
    tags: ["cs", "math"],
    draft: true,
  },
  {
    slug: "what-even-is-reality",
    title: "what even is reality?",
    date: "2025-06-20",
    excerpt:
      "Quantum part one: glowing iron rods, the ultraviolet catastrophe, and how Planck accidentally started a revolution.",
    tags: ["physics", "quantum"],
  },
  {
    slug: "welcome",
    title: "welcome",
    date: "2025-03-04",
    excerpt:
      "If life had a console, what would your first line be? An intro to this open-source life project, one commit at a time.",
    tags: ["life"],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
