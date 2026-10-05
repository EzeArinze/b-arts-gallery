import { HoverExpand_001 } from "@/components/ui/skiper-ui/skiper52";
import { HOME_QUERY_RESULT } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

export default function NewDrops({
  newPostImage,
}: {
  newPostImage: HOME_QUERY_RESULT["newPostImages"];
}) {
  if (!newPostImage?.length) return null;

  const images = newPostImage.slice(0, 4);

  const hoverImages = images
    .filter((item) => item.image.url)
    .map((item, index) => ({
      src: urlFor(item.image.url!).url(),
      alt: item.image.alt || "New drop artwork",
      code: `# 0${index + 1}`,
    }));

  if (!hoverImages.length) return null;

  return (
    <section className="mx-auto w-full max-w-7xl bg-background px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Header */}
      <header className="mb-6 flex items-end justify-between border-b border-foreground/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-red-600" />

          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/60 sm:text-[11px]">
            New drop
          </span>
        </div>

        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/40">
          2026 / {String(images.length).padStart(2, "0")}
        </span>
      </header>

      {/* Interactive image gallery */}
      <div className="relative overflow-hidden">
        <HoverExpand_001
          images={hoverImages}
          className="h-105 w-full sm:h-130 lg:h-150"
        />

        {/* Editorial typography */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full">
            <div className="mx-auto max-w-225">
              <p
                className="
                  text-center
                  text-[clamp(4rem,10vw,9rem)]
                  font-black
                  uppercase
                  leading-[0.72]
                  tracking-[-0.075em]
                  text-white
                  mix-blend-difference
                "
              >
                New
              </p>

              <p
                className="
                  text-center
                  text-[clamp(4rem,10vw,9rem)]
                  font-black
                  uppercase
                  leading-[0.72]
                  tracking-[-0.075em]
                  text-red-600
                "
              >
                Drop
              </p>
            </div>
          </div>
        </div>

        {/* Top label */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 sm:left-6 sm:top-6 lg:left-8 lg:top-8">
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white mix-blend-difference sm:text-[10px]">
            Just landed
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-3 flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/40 sm:text-[10px]">
          Latest collection
        </span>

        <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/40 sm:text-[10px]">
          Hover to explore ↓
        </span>
      </footer>
    </section>
  );
}
