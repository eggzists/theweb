# Admin interface for posts, media, bookshelf, projects and site info

> **Status (2026-10-08): approved, paused before implementation.**
> Done so far: dependencies installed (`@supabase/supabase-js`, `@supabase/ssr`, `react-markdown`, `remark-gfm`, `zod`, dev `tsx`). Nothing else from this plan has been written.
> To resume: the user creates a free Supabase project (setup step 1 below), then implement the "Files" section top to bottom, then run the import script and the Verification checks.
> Since the plan was written, all three posts got `music` set to a Spotify track in `src/content/posts.ts`; the import script must carry the `music` field across.

## Context
Right now every post, image, song, book and project lives in code (`src/content/*.ts`, `src/content/posts/*.mdx`, `public/`). Adding a post means opening the repo, editing files and redeploying. Tinu wants an admin interface on the live site, usable from a phone, to add posts with images and music, plus manage the bookshelf, projects and site info.

Decisions already made with the user:
- **Supabase** backs it: Postgres for content, Storage for images and music.
- **The admin lives on the live site** at `/admin`, behind a login, so it works from any device.
- **Scope:** posts (with images and music), bookshelf, projects (Building list and smaller things) and site info. Quotes stay in code.

Outcome: saving in `/admin` updates the public site within seconds, with no redeploy and no code edits.

## Architecture
- **Reads (public pages):** server components call small data functions in `src/lib/content.ts`. These use `'use cache'` + `cacheTag(...)` and a cookie-less Supabase client with the publishable (anon) key. Per the Next 16 docs, `cookies()` can't be read inside `use cache`, so public reads stay cookie-free. Pages remain static and fast.
- **Writes (admin):** Server Actions use a cookie-based Supabase client (`@supabase/ssr`). Row Level Security (RLS) does the real enforcement. After each write the action calls `updateTag(...)` (Server Actions only, read-your-own-writes) so public pages refresh right away.
- **Uploads:** images and audio go straight from the browser to Supabase Storage using the signed-in session. Music files can be several MB, larger than a Server Action body comfortably carries, so they must not pass through Vercel. The file's public URL is then saved on the post.
- **Auth:** Supabase email + password for a single owner. Public sign-ups are disabled in the Supabase dashboard. An `admins` table holds the owner's user id, and every write policy checks membership. `src/proxy.ts` (Next 16's replacement for middleware) refreshes the session and redirects signed-out visitors from `/admin/*` to `/admin/login`.
- **Post bodies:** Markdown, not MDX. MDX from a database would execute code at render time. Rendering uses `react-markdown` + `remark-gfm` with custom components:
  - `![alt](url)` renders as an image.
  - A fenced ` ```equation ` block renders as the centred equation style. It replaces the `<div className="equation">` in the reality post.
  - Quotes and code keep the current `.prose` styles in `src/app/globals.css`.

## Data model (`supabase/migrations/0001_init.sql`)
- `admins (user_id uuid pk references auth.users)`
- `posts`: `id`, `slug unique`, `title`, `excerpt`, `tags text[]`, `body text`, `published_on date`, `status ('draft'|'published')`, `music jsonb null` (same shape as the existing `Music` type in `src/content/posts.ts`: `{title, artist, src?, spotify?}`), `created_at`, `updated_at`
- `books`: `id`, `title`, `author`, `status ('reading'|'read'|'want')`, `kind`, `href`, `note`, `finished`, `sort int` (mirrors the `Reading` type in `src/content/reading.ts`)
- `projects`: `id`, `section ('building'|'smaller')`, `name`, `year`, `status`, `kind`, `pitch`, `problem`, `highlights text[]`, `stack text[]`, `live`, `repo`, `hue`, `note`, `tag`, `sort int` (covers both `projects` and `experiments` in `src/content/projects.ts`)
- `site_settings`: a single row with `name`, `handle`, `location`, `intro`, `tagline`, `email`, `links jsonb`
- **RLS:**
  - Public `select` on published posts, `books`, `projects` and `site_settings`.
  - All `insert`/`update`/`delete` require `exists (select 1 from admins where user_id = auth.uid())`.
  - Drafts are readable only by admins.
- **Storage:** a public bucket `media` with folders `images/` and `music/`. Public read; upload and delete only for admins (same check). Size and MIME limits: images up to 10 MB; audio up to 25 MB (mp3/m4a/ogg/wav).

## Files

**New**
- `src/lib/supabase/public.ts`: cookie-less client for cached reads
- `src/lib/supabase/server.ts`: cookie client for Server Actions and admin pages
- `src/lib/supabase/browser.ts`: client for login and direct uploads
- `src/lib/content.ts`: `getPosts()`, `getPost(slug)`, `getBooks()`, `getProjects()` and `getSite()`, each with `'use cache'` and a tag (`posts`, `post:<slug>`, `books`, `projects`, `site`). Keeps the `Post`, `Music` and `Reading` types plus `formatDate`, moved from `src/content/posts.ts`.
- `src/components/markdown.tsx`: Markdown renderer with the custom components above
- `src/proxy.ts`: session refresh and `/admin` guard
- `src/app/admin/`, with its own minimal layout (`robots: noindex`, no public nav/footer), mobile-first:
  - `login/page.tsx`
  - `page.tsx`: dashboard with counts and quick links
  - `posts/page.tsx` (list, drafts first) and `posts/[id]/page.tsx` (editor; `new` creates a draft). The editor has:
    - Fields for title, slug (auto from title, editable), date, tags, excerpt and status.
    - A Markdown textarea with a **Write / Preview** toggle; the preview uses `markdown.tsx`.
    - **Add image**: upload, then insert `![alt](url)` at the cursor.
    - A **Music** panel: upload an audio file *or* paste a Spotify link, plus title and artist. It previews with the existing `src/components/music-player.tsx`, and shows a one-line rights reminder for uploaded files.
    - Buttons for Save draft, Publish, View post and Delete.
  - `books/page.tsx`: inline add, edit, reorder and status change
  - `projects/page.tsx`: the two sections, add, edit and reorder
  - `site/page.tsx`: form for the settings row
  - `actions.ts`: Server Actions (validate with `zod`, write, `updateTag`)
- `scripts/import-content.ts`: a one-off import, run locally. It reads the current `src/content/*` and the three `.mdx` posts (converted to Markdown), uploads `public/images/banner.png` and `pi.png` to Storage with rewritten links, and inserts everything. It uses the service-role key from `.env.local` (git-ignored), which is never shipped to the browser.
- `.env.local.example`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (import script only)

**Changed**
- Public pages switch from static imports to `src/lib/content.ts`: `src/app/page.tsx`, `src/app/writing/page.tsx`, `src/app/writing/[slug]/page.tsx` (keeps the Suspense shell; renders `<Markdown>` instead of the dynamic MDX import; `generateStaticParams` uses `getPosts()`), `src/app/reading/page.tsx`, `src/app/about/page.tsx`, `src/components/nav.tsx`, `src/components/footer.tsx`, and `src/app/layout.tsx` (metadata from `getSite()`).
- The route structure moves the public pages into a `(site)` route group, so `/admin` doesn't inherit the public nav and footer. URLs don't change.
- `next.config.ts`: drop `createMDX`; allow the Supabase Storage host for images.
- `package.json`: add `@supabase/supabase-js`, `@supabase/ssr`, `react-markdown`, `remark-gfm` and `zod`; remove the `@next/mdx`/`@mdx-js/*` packages and `src/mdx-components.tsx`.
- `README.md`: replace "edit src/content" with the admin flow and the one-time Supabase setup.

**Removed after a successful import:** `src/content/posts.ts`, `src/content/posts/*.mdx`, `src/content/reading.ts`, `src/content/projects.ts`, `src/content/site.ts`, `public/music/README.md`. `src/content/quotes.ts` stays.

## One-time setup the user does (I'll guide each step)
1. Create a Supabase project (free tier) and run `0001_init.sql` in the SQL editor.
2. Under Auth → Providers → Email, turn off "Allow new users to sign up". Then create your own user under Auth → Users and add its id to `admins`.
3. Put the URL and keys in `.env.local`, and add the URL and publishable key to Vercel project env vars. The service-role key goes only in `.env.local`, never in Vercel.
4. Run `npx tsx scripts/import-content.ts` once.

## Verification
- `npm run lint`, `npx tsc --noEmit` and `npm run build` pass.
- Locally with `next start`:
  - Sign in at `/admin/login`.
  - Create a draft post with an uploaded image and an uploaded audio file. Confirm the draft is not visible on `/writing`, then publish.
  - Confirm `/writing` and the post page show it right away without a rebuild (`updateTag`), the image renders, and the player loads with the right duration.
  - Repeat with a Spotify link.
  - Edit a book, a project and the site intro, and confirm the home, `/reading` and `/about` pages update.
- **Security checks with curl** using only the anon key: inserting into `posts`, uploading to `media`, and reading a draft must all fail. Signing up a new user must be rejected.
- **Migration parity:** the three existing posts, the bookshelf entry and all projects render the same as before the import (compare with screenshots). The old `.html` redirects still work.
- Check `/admin` at phone width (390px) in Chrome. Test audio playback in a visible tab, since my automated tab can't load media.
- Commit to `revamp` and push when asked. The Vercel preview needs the two public env vars set first.
