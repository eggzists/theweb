import type { StaticImageData } from "next/image";
import pmCrewDesktop from "./shots/productminds-crew-desktop.jpg";
import pmHomeDesktop from "./shots/productminds-home-desktop.jpg";
import pmLoginDesktop from "./shots/productminds-login-desktop.jpg";
import pmLoginMobile from "./shots/productminds-login-mobile.jpg";
import pmPostsDesktop from "./shots/productminds-posts-desktop.jpg";
import pmVoyageDesktop from "./shots/productminds-voyage-desktop.jpg";
import raAskMobile from "./shots/raasta-ask-mobile.jpg";
import raCareersDesktop from "./shots/raasta-careers-desktop.jpg";
import raHomeDesktop from "./shots/raasta-home-desktop.jpg";
import raHomeMobile from "./shots/raasta-home-mobile.jpg";
import raMythsMobile from "./shots/raasta-myths-mobile.jpg";
import raQuizMobile from "./shots/raasta-quiz-mobile.jpg";
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
    shotsNote: "The portal is members-only, so these are from an admin account.",
    shots: [
      {
        src: pmLoginDesktop,
        alt: "ProductMinds sign-in screen on desktop: \"Come aboard.\" with a Continue with Google button",
        caption: "Sign in with the Google account your admin added to the roster.",
        device: "desktop",
      },
      {
        src: pmHomeDesktop,
        alt: "ProductMinds home: an admin-only row of counts, then cards for sessions, your stake and this week's checkpoint",
        caption: "Home. Admins get a row of what needs doing; everything below it is what every member sees.",
        device: "desktop",
      },
      {
        src: pmVoyageDesktop,
        alt: "ProductMinds Voyage page: four phases across the top and each week's sessions listed with their status",
        caption: "The voyage, phase by phase and session by session.",
        device: "desktop",
      },
      {
        src: pmCrewDesktop,
        alt: "ProductMinds Crew page: a table of members with attendance, posts and stake",
        caption: "Crew, as admins see it.",
        device: "desktop",
      },
      {
        src: pmPostsDesktop,
        alt: "ProductMinds Posts page for admins with an empty queue: \"Nothing to check.\"",
        caption: "Admins confirm each post before it counts toward the stake.",
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
    slug: "raasta",
    name: "Raasta",
    year: "2026",
    status: "Live",
    kind: "Career guidance for students",
    pitch: "Find a career that fits you, with honest pay, real cutoffs and no sign-up.",
    problem:
      "Choosing a stream, then a course, then a college is one of the biggest decisions a student makes, and most of the information out there is scattered, sales-driven or written for people who already know what they want. About 1 in 10 students in India get any professional career guidance, and the tests and counselling that exist often cost ₹1,000 to ₹5,000.",
    features: [
      {
        title: "Start from what you know",
        body: "Four ways in: I know my stream, I'm choosing a college, I'm deciding between two careers, and I've heard something and want to check it.",
      },
      {
        title: "A 1-minute quiz",
        body: "Six everyday questions, like what you'd pick on a free Saturday. No wrong answers, and the result is a starting point, not a verdict.",
      },
      {
        title: "41 careers, 64 colleges",
        body: "Search and filter careers by field, see which streams lead to each, and compare colleges on cutoffs, fees and placements.",
      },
      {
        title: "Compare two careers",
        body: "Pay, subjects, exams and the path to get there, side by side.",
      },
      {
        title: "Myth buster",
        body: "\"Only IIT matters.\" \"Design and art don't pay.\" The things people tell students, checked against real data.",
      },
      {
        title: "Ask Raasta",
        body: "An AI guide that answers from Raasta's checked data and can use your quiz result, stream and saved careers if you've shared them. Chats aren't saved.",
      },
    ],
    decisions: [
      "No sign-up. Saved careers stay on the device, with a way to move them to another one.",
      "Every pay, fee and cutoff figure is labelled official, reported or a rough estimate, and each career links to the official site.",
      "The quiz and suggestions are starting points to talk through with family and teachers, not decisions.",
      "Analytics count anonymous views and steps, with no cookies and nothing that identifies a student.",
      "Career stress is normal, so every page points to Tele-MANAS (14416), the government's free 24x7 helpline.",
    ],
    facts: [
      { value: "41", label: "careers" },
      { value: "64", label: "colleges" },
      { value: "6", label: "quiz questions" },
      { value: "0", label: "sign-ups needed" },
    ],
    stack: ["Next.js", "Vercel"],
    live: "https://raastaai.vercel.app",
    shots: [
      {
        src: raHomeDesktop,
        alt: "Raasta home page: \"Find a career that fits you\" with a quiz button and four ways to start",
        caption: "Start from what you already know.",
        device: "desktop",
      },
      {
        src: raCareersDesktop,
        alt: "Raasta Explore careers page with search, field filters and career cards tagged by stream",
        caption: "41 careers, filterable by field and tagged by stream.",
        device: "desktop",
      },
      {
        src: raHomeMobile,
        alt: "Raasta home page on a phone with a bottom tab bar",
        caption: "Built for the phone most students actually have.",
        device: "mobile",
      },
      {
        src: raQuizMobile,
        alt: "Raasta quiz on a phone: \"A free Saturday. What do you pick?\" with four options",
        caption: "Six questions. Go with your first instinct.",
        device: "mobile",
      },
      {
        src: raMythsMobile,
        alt: "Raasta myth buster on a phone listing common myths about streams and careers",
        caption: "Myths, checked against data.",
        device: "mobile",
      },
      {
        src: raAskMobile,
        alt: "Ask Raasta on a phone: an AI guide with suggested questions",
        caption: "An AI guide that answers from Raasta's own data.",
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
