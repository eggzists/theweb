import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-24 sm:px-6">
      <p className="text-sm text-dim">404</p>
      <h1 className="mt-3 font-serif text-5xl text-fg">This page is in a superposition.</h1>
      <p className="mt-4 text-muted">You looked, so it collapsed into &ldquo;doesn&apos;t exist&rdquo;.</p>
      <Link href="/" className="link mt-8 inline-block">
        Back home
      </Link>
    </div>
  );
}
