import Link from "next/link";
import { site } from "@/content/site";
import { Morse } from "./morse";

export function Footer() {
  return (
    <footer className="mx-auto mt-28 w-full max-w-2xl border-t border-line px-5 py-10 text-sm text-muted sm:px-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p>
          {site.name}, {site.location}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {site.email && (
            <a className="hover:text-fg" href={`mailto:${site.email}`}>
              email
            </a>
          )}
          <a className="hover:text-fg" href={site.links.github} target="_blank" rel="noreferrer">
            github
          </a>
          <a className="hover:text-fg" href={site.links.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
          <Link className="hover:text-fg" href="/quotes">
            quotes
          </Link>
        </div>
      </div>
      <Morse />
    </footer>
  );
}
