export type Project = {
  name: string;
  year: string;
  status: "Live" | "Building" | "Shipped" | "Client";
  kind: string;
  pitch: string;
  problem: string;
  highlights: string[];
  stack: string[];
  live?: string;
  repo?: string;
  /** Accent used for the card glow. */
  hue: number;
};

/** Featured product work, in display order. */
export const projects: Project[] = [
  {
    name: "ProductMinds",
    year: "2026",
    status: "Building",
    kind: "Cohort platform",
    pitch: "The home base for an invite-only PM interview prep cohort.",
    problem:
      "Accountability groups run on Slack, and Slack forgets. Members needed one place to find sessions, materials and their own progress, and a reason to keep showing up.",
    highlights: [
      "Commitment stake members earn back by attending, sharing their work and clearing weekly checkpoints",
      "Session archive: recordings, materials and a \"ship from this session\" task, wrapped up within 24 hours",
      "Private progress for each member, shared activity for the group, and admin tools kept separate",
    ],
    stack: ["Next.js 16", "React 19", "Supabase", "Tailwind 4"],
    live: "https://productminds.vercel.app",
    hue: 228,
  },
  {
    name: "Ungatekeep",
    year: "2026",
    status: "Live",
    kind: "Consumer map app",
    pitch: "Spots real people found, not what the algorithm decided to show you.",
    problem:
      "The best local places (the chai stall with no sign, the viewpoint only locals know) never show up in search results.",
    highlights: [
      "Map-first: drop a pin, log a find, and it shows up live for everyone",
      "No login wall, so adding a spot takes seconds",
      "Moderated by the community: a spot is hidden automatically after 3 reports",
    ],
    stack: ["Next.js", "MapLibre GL", "Supabase", "Tailwind"],
    live: "https://ungatekeep.in",
    hue: 32,
  },
  {
    name: "Internify",
    year: "2025",
    status: "Shipped",
    kind: "Two-sided marketplace",
    pitch: "An internship hub connecting Indian students with recruiters.",
    problem:
      "Students hunt across scattered listings while recruiters sift through unfiltered applications.",
    highlights: [
      "Separate dashboards for students, recruiters and admins",
      "Create a profile, browse and filter roles, connect",
      "Supabase auth and data behind a fast Vite + React front end",
    ],
    stack: ["React", "TypeScript", "Supabase", "shadcn/ui"],
    repo: "https://github.com/eggzists/internify-india-hub",
    hue: 152,
  },
  {
    name: "LifeWatch",
    year: "2025",
    status: "Live",
    kind: "Health dashboard",
    pitch: "Real-time vital monitoring, with medication and emergency views.",
    problem:
      "Caregivers need to see vitals, medications and emergency contacts at a glance, not across three apps.",
    highlights: [
      "Live vitals dashboard",
      "Medication tracking and a dedicated emergency view",
      "Prototyped quickly with v0, then refined by hand",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind"],
    live: "https://v0-real-time-vital-monitoring.vercel.app",
    repo: "https://github.com/eggzists/lifewatch",
    hue: 350,
  },
  {
    name: "Clarity Hub",
    year: "2025",
    status: "Client",
    kind: "Creator website",
    pitch: "A home for a creator's content, courses and 1:1 bookings.",
    problem:
      "The creator's videos, modules and session bookings were spread across platforms with no single front door.",
    highlights: [
      "Videos, modules and a book-a-session flow in one site",
      "Designed around a clear \"clarity over noise\" voice",
    ],
    stack: ["React", "TypeScript", "Supabase"],
    live: "https://clarity-hub-kappa.vercel.app",
    hue: 268,
  },
];

/** Smaller builds and experiments. */
export const experiments = [
  {
    name: "Sorting Visualizer",
    note: "Watch sorting algorithms race, bar by bar.",
    tag: "React",
    href: "https://sorting-visualizer-blue-six.vercel.app",
  },
  {
    name: "Movie Recommender",
    note: "Content-based recommendations with a Streamlit front end.",
    tag: "Python · ML",
    href: "https://github.com/eggzists/Movie-Recommender",
  },
  {
    name: "Tic-Tac-Toe",
    note: "A first React project, still undefeated against itself.",
    tag: "React",
    href: "https://github.com/eggzists/TicTacToe",
  },
  {
    name: "LeetCode",
    note: "Problem-solving practice, in C.",
    tag: "C · DSA",
    href: "https://github.com/eggzists/Leetcode",
  },
];
