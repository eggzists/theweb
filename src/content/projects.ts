import type { StaticImageData } from "next/image";
import pmLoginDesktop from "./shots/productminds-login-desktop.jpg";
import pmLoginMobile from "./shots/productminds-login-mobile.jpg";
import ugAboutMobile from "./shots/ungatekeep-about-mobile.jpg";
import ugHomeDesktop from "./shots/ungatekeep-home-desktop.jpg";
import ugHomeMobile from "./shots/ungatekeep-home-mobile.jpg";
import ugMapDesktop from "./shots/ungatekeep-map-desktop.jpg";
import ugMapMobile from "./shots/ungatekeep-map-mobile.jpg";
import ugSearchMobile from "./shots/ungatekeep-search-mobile.jpg";

export type Shot = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  /** Desktop shots get a browser frame, mobile shots a phone frame. */
  device: "desktop" | "mobile";
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  status: "Live" | "Building" | "Shipped";
  kind: string;
  pitch: string;
  problem: string;
  /** What it does, as short titled points. */
  features: { title: string; body: string }[];
  /** Product calls that shaped it. */
  decisions: string[];
  /** A few numbers or facts that describe it at a glance. */
  facts: { value: string; label: string }[];
  stack: string[];
  live?: string;
  repo?: string;
  /** The first desktop shot is used as the cover. */
  shots: Shot[];
  /** Optional note shown above the screenshots. */
  shotsNote?: string;
};

/** Product work, in display order. Each one gets a case study at /projects/<slug>. */
export const projects: Project[] = [
  {
    slug: "productminds",
    name: "ProductMinds",
    year: "2026",
    status: "Building",
    kind: "Cohort platform",
    pitch: "The home base for an invite-only PM interview prep cohort.",
    problem:
      "Accountability groups run on Slack, and Slack forgets. Members needed one place to find sessions, materials and their own progress, and a reason to keep showing up for six weeks straight.",
    features: [
      {
        title: "Five questions, five places",
        body: "What do I do this week? Where's the stuff from that session? Who can help? Am I safe? Each question gets exactly one destination: Home, Voyage, Library, Crew and Me.",
      },
      {
        title: "A stake you earn back",
        body: "Three promises: show up to 15 of 18 sessions, share 6 posts, clear 6 checkpoints. Progress is shown as rows of dots, with one line saying exactly what's left.",
      },
      {
        title: "The voyage at a glance",
        body: "A grid of weeks by Tue, Thu, Sat and checkpoint Sunday, with phases running down the side, so every member can see where the cohort is and what's next.",
      },
      {
        title: "Wrap a session in two minutes",
        body: "Session leaders mark attendance, drop the recording and materials, and set a \"ship from this session\" task, from their phone, within 24 hours.",
      },
      {
        title: "A library that compounds",
        body: "Resources attach to a session topic rather than a date, so every new cohort inherits everything the last one found useful.",
      },
      {
        title: "Crew, not a leaderboard",
        body: "Profiles show what people are working on and can help with, plus recent activity. Never anyone's stake or attendance.",
      },
    ],
    decisions: [
      "Slack is for conversation. The portal is the archive: anything a member would want to find again.",
      "No leaderboards, points or streak shaming. Status is shown as shapes; words are saved for what's next.",
      "Stake status is private to each member and the admins. The crew only ever sees activity.",
      "Nothing unbuilt appears in the navigation.",
      "Admins get a separate space and a \"view as member\" toggle, so admin details never leak into member views.",
    ],
    facts: [
      { value: "6", label: "week voyage" },
      { value: "18", label: "live sessions" },
      { value: "6", label: "Sunday checkpoints" },
      { value: "3", label: "phases: profile, applications, mocks" },
    ],
    stack: ["Next.js 16", "React 19", "Supabase", "Tailwind 4", "TypeScript"],
    live: "https://productminds.vercel.app",
    shotsNote: "The portal itself is members-only, so this is the front door.",
    shots: [
      {
        src: pmLoginDesktop,
        alt: "ProductMinds sign-in screen on desktop: \"Come aboard.\" with member ID and password fields",
        caption: "Sign in with the member ID your admin gives you.",
        device: "desktop",
      },
      {
        src: pmLoginMobile,
        alt: "ProductMinds sign-in screen on a phone",
        caption: "Built phone-first, like everything inside.",
        device: "mobile",
      },
    ],
  },
  {
    slug: "ungatekeep",
    name: "Ungatekeep",
    year: "2026",
    status: "Live",
    kind: "Consumer map app",
    pitch: "The spots your group chat gatekeeps, now on a map.",
    problem:
      "The best places in a city (the chai stall with no sign, the viewpoint only locals know) never show up in search results. Guides flatten them into rankings. Ungatekeep is the opposite: a shared notebook where someone writes down what they walked past, and the next person gets to find it.",
    features: [
      {
        title: "Map first",
        body: "Open it and you're looking at the city. Every find is a pin, and new ones show up live for everyone.",
      },
      {
        title: "Log a find in seconds",
        body: "No login wall. Drop a pin, write one line, pick a category, done.",
      },
      {
        title: "Built for wandering",
        body: "Filter by chai and coffee, street food, viewpoints, walks, art, live music, bookstores and quiet corners, or tap \"near me\".",
      },
      {
        title: "Search and lists",
        body: "Find spots by name, area or category, and save the good ones into lists you can share.",
      },
      {
        title: "Moderated by the community",
        body: "Anyone can report a spot. Three reports and it's hidden automatically, no waiting on an admin.",
      },
    ],
    decisions: [
      "One line is enough. This isn't a review site, so there are no stars and no rankings.",
      "Log it only if it's findable. Vague pins help nobody.",
      "Don't log someone's home, or anything that gets crowded to death.",
      "If a spot's gone, say so. Corrections count as contributions.",
      "No ads, and nothing stands between a person and adding what they found.",
    ],
    facts: [
      { value: "Live", label: "in Bengaluru" },
      { value: "8", label: "kinds of finds" },
      { value: "0", label: "logins to add a spot" },
      { value: "3", label: "reports to hide one" },
    ],
    stack: ["Next.js 16", "React 19", "MapLibre GL", "Supabase", "Tailwind"],
    live: "https://ungatekeep.in",
    shots: [
      {
        src: ugHomeDesktop,
        alt: "Ungatekeep landing page: the word \"gate\" struck out of \"ungatekeep\", surrounded by photos of local food and streets",
        caption: "The landing page. Live in Bengaluru.",
        device: "desktop",
      },
      {
        src: ugMapDesktop,
        alt: "Ungatekeep map of Bengaluru with category filters and a list of recent finds",
        caption: "The map, with category filters and recent finds alongside.",
        device: "desktop",
      },
      {
        src: ugMapMobile,
        alt: "Ungatekeep map on a phone with Log a find and Near me buttons",
        caption: "Log a find, or see what's near you.",
        device: "mobile",
      },
      {
        src: ugSearchMobile,
        alt: "Ungatekeep search screen on a phone with category chips",
        caption: "Search by name, area or category.",
        device: "mobile",
      },
      {
        src: ugAboutMobile,
        alt: "Ungatekeep about screen on a phone listing the house rules",
        caption: "Field notes from a night walk, and four house rules.",
        device: "mobile",
      },
      {
        src: ugHomeMobile,
        alt: "Ungatekeep landing page on a phone",
        caption: "The landing page on a phone.",
        device: "mobile",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function coverShot(project: Project) {
  return project.shots.find((s) => s.device === "desktop") ?? project.shots[0];
}
