import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { reading, statusLabel, type Reading } from "@/content/reading";

export const metadata: Metadata = {
  title: "Reading",
  description: "Books and other things I've been reading, with a line on what stuck.",
};

const order: Reading["status"][] = ["reading", "read", "want"];

export default function ReadingPage() {
  const groups = order
    .map((status) => ({ status, items: reading.filter((r) => r.status === status) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-2xl px-5 pt-20 sm:px-6">
      <Reveal>
        <h1 className="font-serif text-5xl text-fg">Bookshelf</h1>
        <p className="mt-4 text-lg text-muted">
          Books, essays and papers I&apos;ve been reading, with a line on what stuck.
        </p>
      </Reveal>

      {groups.map((group, i) => (
        <Reveal key={group.status} delay={0.05 * i} className="mt-16">
          <h2 className="mb-4 text-sm text-dim">{statusLabel[group.status]}</h2>
          <ul className="divide-y divide-line border-y border-line">
            {group.items.map((item) => (
              <li key={`${item.title}-${item.author}`} className="py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p>
                    {item.href ? (
                      <a className="link font-serif text-xl" href={item.href} target="_blank" rel="noreferrer">
                        {item.title}
                      </a>
                    ) : (
                      <span className="font-serif text-xl text-fg">{item.title}</span>
                    )}
                    <span className="text-muted"> · {item.author}</span>
                  </p>
                  <span className="text-sm text-dim">
                    {[item.kind !== "book" ? item.kind : null, item.finished].filter(Boolean).join(" · ")}
                  </span>
                </div>
                {item.note && <p className="mt-2 text-sm leading-relaxed text-soft">{item.note}</p>}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
