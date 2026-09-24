"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AuthUser from "./auth-user";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const LINKS = [
  { href: "/art", label: "Collections" },
  { href: "/", label: "About" },
  { href: "#shop", label: "Shop" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Fires once the 1px sentinel scrolls out of view — cheaper than a
    // scroll listener since it runs off the main thread.
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 h-px w-full" />

      <header
        data-scrolled={scrolled}
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out
          data-[scrolled=true]:bg-black/60 data-[scrolled=true]:backdrop-blur-md
          data-[scrolled=true]:border-b data-[scrolled=true]:border-primary/10
          data-[scrolled=true]:shadow-[0_1px_0_rgba(255,255,255,0.03),0_20px_40px_-20px_rgba(0,0,0,0.5)]"
      >
        <nav className="flex items-center justify-between px-6 py-5 md:px-16">
          <Logo />

          <ul className="hidden md:flex items-center gap-10">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-[11px] font-medium uppercase tracking-[0.25em] text-primary/80 transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                  {/* transform, not width — scale-x is compositor-friendly */}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <AuthUser />
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
