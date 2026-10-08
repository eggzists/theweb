/**
 * Easter eggs hidden around the site. Finding one shows a toast and ticks it off on /found.
 * To add one: give it an entry here, then call `findEgg("<id>")` wherever it's hidden.
 */
export const eggs = [
  { id: "konami", name: "Old habits", hint: "Some codes never die. ↑ ↑ ↓ ↓ …" },
  { id: "console", name: "Backstage pass", hint: "Developers know where to look." },
  { id: "morse", name: "Signal received", hint: "The footer is trying to tell you something." },
  { id: "dizzy", name: "Dizzy", hint: "Some names like being clicked. A lot." },
  { id: "quotes", name: "Completionist", hint: "Read every line that stuck." },
  { id: "answer", name: "Don't panic", hint: "Search the writing for the answer to everything." },
  { id: "observer", name: "Observer effect", hint: "Get lost. Then look again." },
  { id: "patience", name: "Impatient", hint: "Not everything that counts is a counter. Or is it?" },
  { id: "night-owl", name: "Night owl", hint: "Drop by when you should be asleep." },
] as const;

export type EggId = (typeof eggs)[number]["id"];
