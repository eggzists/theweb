export type Reading = {
  title: string;
  author: string;
  status: "reading" | "read" | "want";
  kind?: "book" | "essay" | "paper";
  /** Optional link to the book, essay or paper. */
  href?: string;
  /** A line on what stuck, or why it's on the list. */
  note?: string;
  /** YYYY or YYYY-MM, when finished. */
  finished?: string;
};

/**
 * The bookshelf. Add entries anywhere; the page groups and orders them.
 * Only the entries below are real so far — add the rest of yours.
 */
export const reading: Reading[] = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    status: "read",
    kind: "book",
    note: "Ravenclaw at heart, probably Gryffindor because of Harry. Still the source of most of my metaphors.",
  },
];

export const statusLabel: Record<Reading["status"], string> = {
  reading: "Reading now",
  read: "Read",
  want: "Up next",
};

export function currentlyReading() {
  return reading.find((r) => r.status === "reading");
}
