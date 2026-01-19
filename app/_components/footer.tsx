import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-primary/30 bg-black px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <span className="font-anton text-sm tracking-[0.3em] text-primary">
            B·ARTS·GALLERY
          </span>

          <nav className="flex gap-8 font-anton text-xs tracking-[0.25em] text-primary/80">
            <Link href="#" className="hover:text-primary transition">
              ABOUT
            </Link>
            <Link href="#" className="hover:text-primary transition">
              WORK
            </Link>
            <Link href="#" className="hover:text-primary transition">
              TYPE
            </Link>
            <Link href="#" className="hover:text-primary transition">
              CONTACT
            </Link>
          </nav>
        </div>

        {/* Divider line */}
        <div className="h-px w-full bg-primary/30" />

        {/* Bottom row */}
        <div className="flex flex-col gap-4 text-xs tracking-[0.2em] text-primary/70 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} B·ARTS·GALLERY</span>

          <span className="uppercase">Designed with restraint</span>
        </div>
      </div>
    </footer>
  );
}
