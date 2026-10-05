import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center px-6 py-12">
      <Link
        href="/"
        className="absolute left-6 top-6 md:left-10 md:top-10 flex items-center gap-2 text-xs tracking-[0.3em] text-primary/70 transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            d="M19 12H5M11 18l-6-6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        HOME
      </Link>
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-10 text-center">
          <div className="text-lg tracking-[0.4em] text-primary/70 font-extrabold blur-[0.4px]">
            BUMEZ ART GALLERY
          </div>
          <h1 className="mt-2 font-anton text-[12vw] md:text-[6rem] leading-[0.9] text-primary">
            JOIN
          </h1>
        </div>

        <SignUp
          appearance={{
            variables: {
              colorBackground: "transparent",
              colorPrimary: "var(--primary)",
              borderRadius: "0px",
            },
            elements: {
              rootBox: "w-full",
              cardBox:
                "w-full shadow-none border border-primary/40 rounded-none",
              card: "bg-transparent shadow-none",
              headerTitle: "font-anton tracking-[0.2em] uppercase",
              formButtonPrimary:
                "font-anton text-xs tracking-[0.35em] rounded-none",
              socialButtonsBlockButton:
                "border border-primary/50 rounded-none font-anton text-xs tracking-[0.2em]",
              footer: "hidden",
            },
          }}
        />
      </div>
    </main>
  );
}
