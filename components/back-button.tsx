"use client";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant={"link"}
      onClick={() => router.back()}
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
      BACK
    </Button>
  );
}
