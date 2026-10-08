import type { Metadata } from "next";
import { FoundList } from "./found-list";

export const metadata: Metadata = {
  title: "Found",
  description: "The easter eggs you've found so far.",
  robots: { index: false },
};

export default function FoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-20 sm:px-6">
      <p className="text-sm text-dim">You weren&apos;t supposed to find this page. Well, you were.</p>
      <h1 className="mt-3 font-serif text-5xl text-fg">Easter eggs</h1>
      <p className="mt-4 text-lg text-muted">
        Little things hidden around the site for people who poke at it. Here&apos;s your haul, saved on
        this device.
      </p>
      <FoundList />
    </div>
  );
}
