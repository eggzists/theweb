import Image from "next/image";
import type { Shot } from "@/content/projects";

/** A screenshot in a minimal browser window. */
export function BrowserFrame({
  shot,
  url,
  sizes = "(min-width: 1024px) 56rem, 100vw",
  eager = false,
}: {
  shot: Shot;
  url?: string;
  sizes?: string;
  eager?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)]">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        {url && (
          <span className="ml-3 truncate font-mono text-[10px] text-dim">
            {url.replace(/^https?:\/\//, "")}
          </span>
        )}
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        sizes={sizes}
        placeholder="blur"
        loading={eager ? "eager" : "lazy"}
        className="block h-auto w-full"
      />
    </div>
  );
}

/** A screenshot in a simple phone outline. */
export function PhoneFrame({ shot, sizes = "16rem" }: { shot: Shot; sizes?: string }) {
  return (
    <div className="rounded-[1.6rem] border border-line bg-surface p-1.5 shadow-[0_24px_50px_-30px_rgb(0_0_0/0.4)]">
      <Image
        src={shot.src}
        alt={shot.alt}
        sizes={sizes}
        placeholder="blur"
        className="block h-auto w-full rounded-[1.2rem]"
      />
    </div>
  );
}
