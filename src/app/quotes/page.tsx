import type { Metadata } from "next";
import { QuoteCycler } from "@/components/quote-cycler";

export const metadata: Metadata = {
  title: "Quotes",
  description: "Lines that stuck.",
};

export default function QuotesPage() {
  return (
    <div className="mx-auto flex min-h-[65svh] max-w-2xl flex-col justify-center px-5 pt-20 sm:px-6">
      <p className="mb-8 text-sm text-dim">Lines that stuck</p>
      <QuoteCycler />
    </div>
  );
}
