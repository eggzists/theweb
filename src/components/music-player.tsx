"use client";

import { AnimatePresence, animate, motion, useDragControls, useMotionValue } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Music } from "@/content/posts";
import { ease } from "./motion";

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/** "https://open.spotify.com/track/abc?si=x" -> "https://open.spotify.com/embed/track/abc" */
function spotifyEmbed(url: string) {
  const u = new URL(url);
  return `https://open.spotify.com/embed${u.pathname.replace(/^\/intl-[a-z]+/, "")}?theme=0`;
}

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const MARGIN = 16;
const CORNER_KEY = "music-player-corner";

/** Top-left coordinates that put a card of this size in the given corner of the viewport. */
function cornerPoint(corner: Corner, width: number, height: number) {
  return {
    x: corner.endsWith("left") ? MARGIN : window.innerWidth - width - MARGIN,
    y: corner.startsWith("top") ? MARGIN : window.innerHeight - height - MARGIN,
  };
}

function readCorner(): Corner {
  try {
    const saved = localStorage.getItem(CORNER_KEY);
    if (saved === "top-left" || saved === "top-right" || saved === "bottom-left" || saved === "bottom-right") {
      return saved;
    }
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the default corner is fine.
  }
  return "bottom-right";
}

/** Lets the track label inside each dock act as the drag handle. */
const DragHandle = createContext<((e: React.PointerEvent) => void) | null>(null);

/**
 * A small card with the post's soundtrack. It sits in a corner of the screen; readers drag it
 * by its handle and it snaps to the nearest corner, remembered on their device.
 * Nothing plays until the reader presses play.
 */
export function MusicPlayer({ music }: { music: Music }) {
  const [dismissed, setDismissed] = useState(false);
  const card = useRef<HTMLElement>(null);
  const corner = useRef<Corner>("bottom-right");
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const snapTo = useCallback(
    (next: Corner, instant = false) => {
      const el = card.current;
      if (!el) return;
      corner.current = next;
      const target = cornerPoint(next, el.offsetWidth, el.offsetHeight);
      if (instant) {
        x.jump(target.x);
        y.jump(target.y);
      } else {
        const spring = { type: "spring", stiffness: 380, damping: 34 } as const;
        animate(x, target.x, spring);
        animate(y, target.y, spring);
      }
    },
    [x, y],
  );

  // Place the card in its saved corner, and keep it there when the window or the card resizes
  // (e.g. the YouTube player opening makes it taller).
  useEffect(() => {
    if (dismissed) return;
    snapTo(readCorner(), true);
    // Hidden until placed, so it never flashes at the top-left first.
    if (card.current) card.current.style.visibility = "visible";
    const keep = () => snapTo(corner.current);
    window.addEventListener("resize", keep);
    const observer = new ResizeObserver(keep);
    if (card.current) observer.observe(card.current);
    return () => {
      window.removeEventListener("resize", keep);
      observer.disconnect();
    };
  }, [dismissed, snapTo]);

  const onDragEnd = () => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const horizontal = r.left + r.width / 2 < window.innerWidth / 2 ? "left" : "right";
    const vertical = r.top + r.height / 2 < window.innerHeight / 2 ? "top" : "bottom";
    const next = `${vertical}-${horizontal}` as Corner;
    snapTo(next);
    try {
      localStorage.setItem(CORNER_KEY, next);
    } catch {
      // Not remembering the corner is fine.
    }
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.aside
          ref={card}
          aria-label="Soundtrack for this post"
          drag
          dragControls={controls}
          dragListener={false}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.6, ease } }}
          exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2, ease } }}
          className="invisible fixed left-0 top-0 z-40 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-line bg-bg/90 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.5)] backdrop-blur-md"
        >
          <DragHandle.Provider value={(e) => controls.start(e)}>
            {music.src ? (
              <AudioDock music={music} onClose={() => setDismissed(true)} />
            ) : music.youtube ? (
              <YouTubeDock music={music} onClose={() => setDismissed(true)} />
            ) : music.spotify ? (
              <SpotifyDock music={music} onClose={() => setDismissed(true)} />
            ) : null}
          </DragHandle.Provider>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="shrink-0 px-1 text-dim hover:text-fg"
      aria-label="Hide the player"
    >
      ×
    </button>
  );
}

/** The track name doubles as the drag handle for moving the card between corners. */
function TrackLabel({ music, status }: { music: Music; status: string }) {
  const startDrag = useContext(DragHandle);
  return (
    <div
      onPointerDown={startDrag ?? undefined}
      className="flex min-w-0 flex-1 cursor-grab touch-none select-none items-center gap-2 active:cursor-grabbing"
      title="Drag to move"
    >
      <svg viewBox="0 0 6 10" className="h-2.5 w-1.5 shrink-0 text-dim" fill="currentColor" aria-hidden>
        <circle cx="1" cy="1" r="1" />
        <circle cx="5" cy="1" r="1" />
        <circle cx="1" cy="5" r="1" />
        <circle cx="5" cy="5" r="1" />
        <circle cx="1" cy="9" r="1" />
        <circle cx="5" cy="9" r="1" />
      </svg>
      <div className="min-w-0">
        <p className="text-xs text-dim">{status}</p>
        <p className="truncate text-sm text-fg">
          {music.title} <span className="text-muted">· {music.artist}</span>
        </p>
      </div>
    </div>
  );
}

function AudioDock({ music, onClose }: { music: Music; onClose: () => void }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(true);
  // True between pressing play and sound actually starting (buffering).
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    el.volume = 0.6;
    // Metadata may have loaded before hydration, in which case onLoadedMetadata never fires for us.
    if (el.readyState >= 1) setDuration(el.duration);
    if (el.error) setFailed(true);
  }, []);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (!el.paused) {
      el.pause();
      return;
    }
    setFailed(false);
    setLoading(true);
    el.play().catch((err: unknown) => {
      setLoading(false);
      setPlaying(false);
      // A missing or unsupported file can fail before hydration, so onError never reaches us.
      if (el.error || (err instanceof DOMException && err.name === "NotSupportedError")) {
        setFailed(true);
      }
    });
  };

  return (
    <div className="px-4 py-3">
      <audio
        ref={audio}
        src={music.src}
        preload="metadata"
        loop={loop}
        muted={muted}
        onPlaying={() => {
          setPlaying(true);
          setLoading(false);
        }}
        onWaiting={() => setLoading(true)}
        onPause={() => {
          setPlaying(false);
          setLoading(false);
        }}
        onError={() => {
          setFailed(true);
          setPlaying(false);
          setLoading(false);
        }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-transform active:scale-95"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg viewBox="0 0 12 12" className="size-3" fill="currentColor" aria-hidden>
              <rect x="2" y="1.5" width="3" height="9" rx="0.5" />
              <rect x="7" y="1.5" width="3" height="9" rx="0.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" className="ml-0.5 size-3" fill="currentColor" aria-hidden>
              <path d="M3 1.8v8.4a.5.5 0 0 0 .77.42l6.4-4.2a.5.5 0 0 0 0-.84l-6.4-4.2A.5.5 0 0 0 3 1.8Z" />
            </svg>
          )}
        </button>
        <TrackLabel
          music={music}
          status={
            failed
              ? "Couldn't load this track"
              : loading
                ? "Loading…"
                : playing
                  ? "Now playing"
                  : "Listen while you read"
          }
        />
        <button
          type="button"
          onClick={() => setLoop((l) => !l)}
          className={`shrink-0 text-xs ${loop ? "text-accent" : "text-dim hover:text-fg"}`}
          aria-pressed={loop}
          title="Loop the track"
        >
          loop
        </button>
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="shrink-0 text-xs text-dim hover:text-fg"
          aria-pressed={muted}
        >
          {muted ? "unmute" : "mute"}
        </button>
        <CloseButton onClose={onClose} />
      </div>
      <div className="mt-2 flex items-center gap-3 text-[11px] tabular-nums text-dim">
        <span className="w-8">{formatTime(time)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          onChange={(e) => {
            if (audio.current) audio.current.currentTime = Number(e.target.value);
          }}
          aria-label="Seek"
          className="h-1 flex-1 cursor-pointer accent-[var(--accent)]"
        />
        <span className="w-8 text-right">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

/** Accepts youtube.com/watch?v=, youtu.be/, /shorts/ and /embed/ links. */
function youtubeId(url: string) {
  const u = new URL(url);
  if (u.hostname === "youtu.be") return u.pathname.slice(1);
  return u.searchParams.get("v") ?? u.pathname.split("/").filter(Boolean).pop() ?? "";
}

/**
 * Plays the full song for every reader via YouTube's privacy-enhanced embed.
 * Nothing loads from YouTube until play is pressed, and the player stays visible
 * while it plays, as YouTube's terms require.
 */
function YouTubeDock({ music, onClose }: { music: Music; onClose: () => void }) {
  const [started, setStarted] = useState(false);
  const id = youtubeId(music.youtube!);

  return (
    <div className="p-3">
      <div className="flex items-center gap-3 px-1">
        {!started && (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-transform active:scale-95"
            aria-label="Play"
          >
            <svg viewBox="0 0 12 12" className="ml-0.5 size-3" fill="currentColor" aria-hidden>
              <path d="M3 1.8v8.4a.5.5 0 0 0 .77.42l6.4-4.2a.5.5 0 0 0 0-.84l-6.4-4.2A.5.5 0 0 0 3 1.8Z" />
            </svg>
          </button>
        )}
        <TrackLabel music={music} status={started ? "Playing from YouTube" : "Listen while you read"} />
        {music.spotify && (
          <a
            href={music.spotify}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-xs text-dim hover:text-fg"
          >
            Spotify ↗
          </a>
        )}
        {started && (
          <button
            type="button"
            onClick={() => setStarted(false)}
            className="shrink-0 text-xs text-dim hover:text-fg"
          >
            stop
          </button>
        )}
        <CloseButton onClose={onClose} />
      </div>
      {started && (
        <iframe
          title={`${music.title} by ${music.artist} on YouTube`}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`}
          className="mt-3 h-[200px] w-full rounded-lg"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}

function SpotifyDock({ music, onClose }: { music: Music; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-3">
      <div className="flex items-center gap-3 px-1">
        <TrackLabel music={music} status="Listen while you read" />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-fg hover:border-muted"
          aria-expanded={open}
        >
          {open ? "hide player" : "open player"}
        </button>
        <CloseButton onClose={onClose} />
      </div>
      {open && (
        <iframe
          title={`${music.title} by ${music.artist} on Spotify`}
          src={spotifyEmbed(music.spotify!)}
          className="mt-3 h-[80px] w-full rounded-lg"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
    </div>
  );
}
