import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion";
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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-20 sm:px-6">
      <Reveal>
        <h1 className="font-serif text-5xl text-fg">About</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-soft">
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
            Away from the keyboard: reading (sometimes spellbooks; see the{" "}
            <Link className="link" href="/reading">
              bookshelf
            </Link>
            ), mind-bending films, music that isn&apos;t CPU fan noise, the odd poem, photography to an
            extent, World War II history, and occasionally pretending to be John Wick.
          </p>
          <p>
            And of course, there&apos;s Mr. Machine, the one thing that never fails to capture my
            interest.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-serif text-2xl text-fg">Currently brewing</h2>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {brewing.map(([k, v]) => (
            <div key={k} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr]">
              <dt className="text-fg">{k}</dt>
              <dd className="text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mt-16">
        <blockquote className="border-l-2 border-accent pl-5 font-serif text-2xl leading-snug text-fg">
          &ldquo;If you think you understand quantum mechanics, you don&apos;t understand quantum
          mechanics.&rdquo;
        </blockquote>
        <p className="mt-3 pl-5 text-sm text-muted">
          Feynman. Same goes for my code, so let&apos;s learn together. Mischief managed. ⚡
        </p>
      </Reveal>
    </div>
  );
}
