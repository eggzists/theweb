import type { Metadata } from "next";
import { QuoteCycler } from "@/components/quote-cycler";

export const metadata: Metadata = {
  title: "Quotes",
  description: "Lines that stuck.",
};

export default function QuotesPage() {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-4xl flex-col justify-center px-5 pt-36 sm:px-8">
      <p className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-dim">Lines that stuck</p>
      <QuoteCycler large />
    </div>
  );
}
