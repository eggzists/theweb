import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mx-auto mt-32 w-full max-w-5xl border-t border-line px-5 py-10 sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-3xl italic text-fg">Let&apos;s build something.</p>
          <p className="mt-2 text-sm text-muted">
            {site.location}. Open to product roles, collaborations and good conversations.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {site.email && (
            <a className="hover:text-fg" href={`mailto:${site.email}`}>
              Email
            </a>
          )}
          <a className="hover:text-fg" href={site.links.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="hover:text-fg" href={site.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <Link className="hover:text-fg" href="/quotes">
            Quotes
          </Link>
        </div>
      </div>
      <p className="mt-10 font-mono text-xs text-dim" title="Morse for E N D">
        . -. -..
      </p>
    </footer>
  );
}
