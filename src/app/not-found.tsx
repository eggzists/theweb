import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-5 pt-36 sm:px-8">
      <p className="font-mono text-xs text-dim">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-fg">
        This page is in a <span className="font-serif font-normal italic text-accent">superposition</span>.
      </h1>
      <p className="mt-4 text-muted">You looked, so it collapsed into &ldquo;doesn&apos;t exist&rdquo;.</p>
      <Link href="/" className="mt-8 text-fg underline decoration-accent underline-offset-4">
        Back home →
      </Link>
    </div>
  );
}
