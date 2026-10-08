"use client";

import { motion, useAnimate } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { site } from "@/content/site";
import { findEgg } from "@/lib/eggs";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/writing", label: "writing" },
  { href: "/reading", label: "reading" },
  { href: "/about", label: "about" },
];

export function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const [scope, animate] = useAnimate();
  const clicks = useRef<number[]>([]);

  // Five quick clicks on the name and it gets dizzy.
  const onNameClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2000), now];
    if (clicks.current.length < 5) return;
    clicks.current = [];
    animate(scope.current, { rotate: [0, 720] }, { duration: 1.2 });
    findEgg("dizzy");
  };

  return (
    <header className="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 pt-10 sm:px-6">
      <Link href="/" onClick={onNameClick} className="font-serif text-xl text-fg">
        <motion.span ref={scope} className="inline-block">
          {site.name}
        </motion.span>
      </Link>
      <nav className="flex gap-4 text-sm sm:gap-5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={`transition-colors ${
              isActive(link.href) ? "text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
