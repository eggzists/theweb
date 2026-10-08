/**
 * A track readers can play while reading a post. The player uses the first of these that's set:
 * - `src`: an audio file you have the rights to, placed in `public/music/` (e.g. "/music/song.mp3").
 * - `youtube`: a YouTube link. Plays the full song for every reader.
 * - `spotify`: a Spotify link. Full song only for readers logged into Spotify, otherwise a
 *   30-second preview. When `youtube` is also set, it's shown as an "also on Spotify" link.
 */
export type Music = {
  title: string;
  artist: string;
  src?: string;
  youtube?: string;
  spotify?: string;
};

export type Post = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  excerpt: string;
  tags: string[];
  draft?: boolean;
  music?: Music;
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
    music: {
      title: "Swimming",
      artist: "Flawed Mangoes",
      youtube: "https://www.youtube.com/watch?v=5k7ccAEaY0Q",
      spotify: "https://open.spotify.com/track/72z7FgU5p0iJ6cXGtAZ0f3",
    },
    draft: true,
  },
  {
    slug: "what-even-is-reality",
    title: "what even is reality?",
    date: "2025-06-20",
    excerpt:
      "Quantum part one: glowing iron rods, the ultraviolet catastrophe, and how Planck accidentally started a revolution.",
    tags: ["physics", "quantum"],
    music: {
      title: "Swimming",
      artist: "Flawed Mangoes",
      youtube: "https://www.youtube.com/watch?v=5k7ccAEaY0Q",
      spotify: "https://open.spotify.com/track/72z7FgU5p0iJ6cXGtAZ0f3",
    },
  },
  {
    slug: "welcome",
    title: "welcome",
    date: "2025-03-04",
    excerpt:
      "If life had a console, what would your first line be? An intro to this open-source life project, one commit at a time.",
    tags: ["life"],
    music: {
      title: "Swimming",
      artist: "Flawed Mangoes",
      youtube: "https://www.youtube.com/watch?v=5k7ccAEaY0Q",
      spotify: "https://open.spotify.com/track/72z7FgU5p0iJ6cXGtAZ0f3",
    },
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
