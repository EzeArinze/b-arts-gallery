"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import hero from "@/public/hero.webp";

/* ------------------------------------------------------------------ *
 * Placeholder works. Swap `src` for real artwork imports; the
 * objectPosition values only exist so the placeholders differ visibly.
 * ------------------------------------------------------------------ */
const WORKS = [
  {
    id: "w1",
    title: "I (1)",
    artist: "Artist Name",
    price: "$4,200",
    src: hero,
    pos: "50% 50%",
  },
  {
    id: "w2",
    title: "II (2)",
    artist: "Artist Name",
    price: "$2,800",
    src: hero,
    pos: "12% 40%",
  },
  {
    id: "w3",
    title: "III (3)",
    artist: "Artist Name",
    price: "$6,500",
    src: hero,
    pos: "88% 60%",
  },
];

// Emil's curves: strong ease-out for entrances/UI, ease-in-out for on-screen movement
const EASE_OUT = "cubic-bezier(0.23,1,0.32,1)";
const EASE_IN_OUT = "cubic-bezier(0.77,0,0.175,1)";

// Static film grain: adds tooth so the photo reads like a print, not a screen
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function GothifHero() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* Gallery spotlight: the room dims, a soft pool of light follows the cursor.
     Decorative, so it's smoothed (lerp) instead of snapping to the pointer,
     and it only exists for fine pointers with motion allowed. */
  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    const ok = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!ok) return;

    const section = el.parentElement as HTMLElement;
    const target = { x: section.clientWidth / 2, y: section.clientHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const paint = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      el.style.background = `radial-gradient(circle 380px at ${pos.x}px ${pos.y}px, transparent 0%, rgba(0,0,0,0.42) 100%)`;
      const settled =
        Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) < 0.5;
      raf = settled ? 0 : requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    section.addEventListener("pointermove", onMove);
    return () => {
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Unveil: the frame opens from a matted inset to full bleed while the
          image settles from 1.1 → 1. One orchestrated moment on load. */}
      <div
        className="absolute inset-0 motion-safe:[transition:transform_6000ms_var(--e-out),clip-path_1400ms_var(--e-io)]"
        style={
          {
            "--e-out": EASE_OUT,
            "--e-io": EASE_IN_OUT,
            clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(6% 4% 6% 4%)",
            transform: ready ? "scale(1)" : "scale(1.1)",
          } as React.CSSProperties
        }
      >
        {/* Each work is stacked; switching crossfades with a touch of blur so
            the two images read as one changing, not two overlapping */}
        {WORKS.map((w, i) => (
          <Image
            key={w.id}
            src={w.src}
            alt={`${w.title} by ${w.artist}`}
            fill
            priority={i === 0}
            style={{ objectPosition: w.pos }}
            className={`object-cover contrast-110 transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              i === active ? "opacity-100 blur-0" : "opacity-0 blur-[2px]"
            }`}
          />
        ))}
      </div>

      {/* Darker at top (nav) and bottom (meta bar), lighter through the middle */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-black/70" />

      {/* Cursor spotlight (styled from the effect above) */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 md:px-16 text-center">
        <div
          className={`motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:delay-300 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] ${
            ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-primary leading-[0.85] text-[22vw] md:text-[18vw]">
            B-ARTS-GALLERY
          </h1>
        </div>

        {/* Plaque: the museum wall label for the work currently on view.
            All three are stacked so switching is a retargetable transition. */}
        <div
          className={`absolute bottom-24 left-6 md:left-16 grid text-left text-primary motion-safe:transition-opacity motion-safe:duration-700 motion-safe:delay-[900ms] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          {WORKS.map((w, i) => (
            <div
              key={w.id}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 flex flex-col gap-3 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                i === active
                  ? "opacity-100 blur-0 translate-y-0"
                  : "pointer-events-none opacity-0 blur-[2px] translate-y-1"
              }`}
            >
              <div>
                <p>{w.title}</p>
                <p className="opacity-60">{w.artist}</p>
                <p>{w.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dock: round thumbnails, with one ring that slides to the selected
            work (same idea as a tab indicator, so it moves instead of
            blinking between items) */}
        <div
          role="group"
          aria-label="Works on view"
          className={`absolute bottom-24 right-6 md:right-16 flex gap-3 motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:delay-1000 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] ${
            ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -left-1.5 -top-1.5 size-17 rounded-full border border-primary/80 transition-transform duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{ transform: `translateX(${active * 68}px)` }}
          />
          {WORKS.map((w, i) => (
            <button
              key={w.id}
              type="button"
              aria-label={`${w.title} by ${w.artist}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className="relative size-14 overflow-hidden rounded-full transition-transform duration-150 ease-out hover:scale-105 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src={w.src}
                alt=""
                fill
                sizes="56px"
                style={{ objectPosition: w.pos }}
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div
          className={`absolute bottom-8 left-6 right-6 md:left-16 md:right-16 flex items-center gap-4 text-xs tracking-[0.3em] text-primary motion-safe:transition-opacity motion-safe:duration-700 motion-safe:delay-[800ms] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="whitespace-nowrap">AN OLD WAYS STORY</span>

          <div className="h-px flex-1 bg-primary/60" />

          <span className="rounded-full border border-primary/60 px-4 py-1 text-[10px] transition-colors duration-200 hover:border-primary hover:bg-primary/10">
            2025 EDITION
          </span>
        </div>
      </div>
    </section>
  );
}
