"use client";

import { eggs } from "@/content/eggs";
import { useFoundEggs } from "@/lib/eggs";

export function FoundList() {
  const found = useFoundEggs();
  const count = eggs.filter((e) => found.includes(e.id)).length;

  return (
    <>
      <div className="mt-10 flex items-baseline gap-3">
        <span className="font-serif text-6xl text-fg tabular-nums">{count}</span>
        <span className="text-muted">of {eggs.length} found</span>
      </div>
      <div className="mt-4 h-px w-full bg-line">
        <div className="h-px bg-accent transition-[width] duration-700" style={{ width: `${(count / eggs.length) * 100}%` }} />
      </div>

      <ul className="mt-10 divide-y divide-line border-y border-line">
        {eggs.map((egg) => {
          const got = found.includes(egg.id);
          return (
            <li key={egg.id} className="grid grid-cols-[2rem_1fr] gap-x-3 py-4">
              <span aria-hidden className={got ? "text-accent" : "text-dim"}>
                {got ? "●" : "○"}
              </span>
              <div>
                <p className={got ? "font-serif text-xl text-fg" : "font-serif text-xl text-dim"}>
                  {got ? egg.name : "???"}
                  <span className="sr-only">{got ? ", found" : ", not found yet"}</span>
                </p>
                <p className="mt-1 text-sm text-muted">{egg.hint}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {count === eggs.length && (
        <p className="mt-10 font-serif text-2xl text-fg">
          All of them. You&apos;re the reason I hide these. Say hi; I&apos;d like to meet you.
        </p>
      )}
    </>
  );
}
