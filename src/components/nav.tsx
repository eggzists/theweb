"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/", label: "home" },
  { href: "/writing", label: "writing" },
  { href: "/reading", label: "reading" },
  { href: "/about", label: "about" },
];

export function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 pt-10 sm:px-6">
      <Link href="/" className="font-serif text-xl text-fg">
        {site.name}
      </Link>
      <nav className="flex gap-5 text-sm">
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
