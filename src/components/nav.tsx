"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Tuck the nav away while scrolling down, bring it back on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
  });

  const activeHref = links.find((l) => isActive(pathname, l.href))?.href;
  const pill = hovered ?? activeHref;

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
    >
      <nav
        className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1.5 shadow-[0_8px_30px_-12px_hsl(var(--glow)/0.25)] backdrop-blur-xl"
        onMouseLeave={() => setHovered(null)}
      >
        <Link
          href="/"
          className="mr-1 flex size-8 items-center justify-center rounded-full bg-fg font-mono text-xs font-bold text-bg"
          aria-label={`${site.name}, home`}
        >
          {site.handle}
        </Link>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(link.href)}
            className={`relative rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 ${
              link.href === activeHref ? "text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {pill === link.href && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-raise"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{link.label}</span>
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
