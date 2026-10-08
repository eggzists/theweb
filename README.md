just a personal webpage, where i post my blogs and thingyy. now also where the products and books live.

Next.js (App Router) + Tailwind CSS + Motion (Framer Motion) + MDX.

## Run it

```bash
npm install
npm run dev
```

## Edit content

Everything lives in `src/content/`, so there's no need to touch components:

- `site.ts`: name, intro, links. Set `email` to show an email link.
- `projects.ts`: what I'm building (`projects`) and smaller builds (`experiments`).
- `posts.ts` + `posts/<slug>.mdx`: to add a post, write the `.mdx` file and add an entry to the list (newest first).
- `reading.ts`: the bookshelf. Status is `reading`, `read` or `want`; the home page mentions whatever is `reading`.
- `quotes.ts`: the quotes on `/quotes`.

### Music for a post

Give a post a soundtrack readers can play while they read by adding `music` to its entry in `posts.ts`:

```ts
// any song, full length for every reader, via YouTube (optionally with a Spotify link alongside)
music: { title: "Song", artist: "Artist", youtube: "https://www.youtube.com/watch?v=...", spotify: "https://open.spotify.com/track/..." },

// an audio file you have the rights to, placed in public/music/
music: { title: "Song", artist: "Artist", src: "/music/song.mp3" },

// Spotify only: full song for readers logged into Spotify, otherwise a 30-second preview
music: { title: "Song", artist: "Artist", spotify: "https://open.spotify.com/track/..." },
```

Nothing plays until the reader presses play. Posts with music get a ♪ in the list.

Old URLs (`/posts/blog1.html` etc.) redirect to their new pages; see `next.config.ts`.
The previous static site is kept in `legacy/` for reference.
