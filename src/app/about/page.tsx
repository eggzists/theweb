import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, WordsIn } from "@/components/motion";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name}, a CS student and product builder from ${site.location}.`,
};

const brewing = [
  ["Product", "figuring out what's worth building, then building it"],
  ["Web", "React, Next.js and Supabase, crafting digital Marauder's Maps"],
  ["Machine learning", "teaching robots to think so I don't have to"],
  ["Python", "Parseltongue for coding wizards"],
  ["C / C++", "for when Python moves slower than a troll in the dungeon"],
  ["DSA", "sorting algorithms are basically Sorting Hat magic"],
];

const offline = [
  "Reading books (sometimes spellbooks)",
  "Mind-bending films",
  "Music that isn't CPU fan noise",
  "Writing the odd poem",
  "Photography, to an extent",
  "World War II history",
  "Pretending to be John Wick, occasionally",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-36 sm:px-8">
      <h1 className="text-[clamp(2.6rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-fg">
        <WordsIn text="Curious by default," />
        <br />
        <span className="font-serif font-normal italic text-accent">
          <WordsIn text="builder by habit." delay={0.2} />
        </span>
      </h1>

      <Reveal delay={0.35}>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-soft">
          <p>
            Yo, I&apos;m Ti. A CS student from {site.location}, a product builder, a wannabe startup
            founder and a lowkey ML wizard. A Ravenclaw at heart, but probably a Gryffindor because
            of, well… Harry.
          </p>
          <p>
            I learn for the thrill of it. My world is a blend of code, creativity and curiosity, and
            lately that means taking ideas all the way from a messy note to something real people
            use. Half the fun is figuring out what&apos;s worth making.
          </p>
          <p>
            And of course, there&apos;s Mr. Machine, the one thing that never fails to capture my
            interest.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim">Currently brewing</h2>
        <dl className="mt-6 border-t border-line">
          {brewing.map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[12rem_1fr]">
              <dt className="text-fg">{k}</dt>
              <dd className="text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-dim">When not building</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {offline.map((item) => (
            <li key={item} className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-soft">
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-20">
        <blockquote className="border-l-2 border-accent pl-6 font-serif text-2xl italic leading-snug text-fg">
          &ldquo;If you think you understand quantum mechanics, you don&apos;t understand quantum
          mechanics.&rdquo;
          <span className="mt-3 block font-mono text-xs not-italic text-dim">
            Feynman. Same goes for my code, so let&apos;s learn together.
          </span>
        </blockquote>
        <p className="mt-12 text-muted">
          More of what I&apos;ve built is on the{" "}
          <Link href="/#work" className="text-fg underline decoration-accent underline-offset-4">
            home page
          </Link>
          , and the rest is on{" "}
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-accent underline-offset-4"
          >
            GitHub
          </a>
          . Mischief managed. ⚡
        </p>
      </Reveal>
    </div>
  );
}
