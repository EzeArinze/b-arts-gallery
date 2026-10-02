import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function BackToGallery({ focusRing }: { focusRing: string }) {
  return (
    <Link
      href="/art"
      className={cn(
        "group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-muted-foreground",
        focusRing,
      )}
    >
      Continue browsing
      <span className="flex size-8 items-center justify-center rounded-none border border-muted/40 transition-colors duration-300 group-hover:border-primary">
        <ArrowUpRight
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.5}
        />
      </span>
    </Link>
  );
}
