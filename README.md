just a personal webpage, where i post my blogs and thingyy. now also where the products live.

Next.js (App Router) + Tailwind CSS + Motion (Framer Motion) + MDX.

## Run it

```bash
npm install
npm run dev
```

## Edit content

Everything lives in `src/content/`, so there's no need to touch components:

- `site.ts`: name, intro, "currently building", links, stack ticker. Set `email` to show an email link.
- `projects.ts`: featured product work (`projects`) and smaller builds (`experiments`).
- `posts.ts` + `posts/<slug>.mdx`: to add a post, write the `.mdx` file and add an entry to the list (newest first).
- `quotes.ts`: the quotes cycled on the home and `/quotes` pages.

Old URLs (`/posts/blog1.html` etc.) redirect to their new pages; see `next.config.ts`.
The previous static site is kept in `legacy/` for reference.
