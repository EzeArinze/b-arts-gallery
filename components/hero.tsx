import Image from "next/image";
import hero from "@/public/hero.webp";
// import AuthUser from "@/app/(art-page)/_components/auth-user";
// import { ThemeToggle } from "./theme-toggle";
// import Logo from "./logo";

export default function GothifHero() {
  return (
    <section className="relative h-screen  w-full overflow-hidden bg-black">
      <Image
        src={hero}
        alt="Gothif background"
        fill
        priority
        className="object-cover contrast-110 brightness-50"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 md:px-16 text-center">
        {/*NAV*/}

        {/*NAV*/}

        <div>
          <span className="md:hidden text-xs font-bold md:font-extrabold tracking-[0.35em] text-primary blur-[0.4px] mb-1">
            BUMEZ ART PRESENTS
          </span>
          <h1 className="text-primary leading-[0.85] text-[22vw] md:text-[18vw]">
            {/*B-ArTS-GALLery*/}
            B-ARTS-GALLERY
          </h1>
        </div>

        <div className="absolute bottom-8 left-6 right-6 md:left-16 md:right-16 flex items-center gap-4 text-xs tracking-[0.3em] text-primary">
          <span className="whitespace-nowrap">AN OLD WAYS STORY</span>

          <div className="h-px flex-1 bg-primary" />

          <span className="rounded-full border border-primary px-4 py-1 text-[10px]">
            2025 EDITION
          </span>
        </div>
      </div>
    </section>
  );
}
