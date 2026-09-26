import Image from "next/image";
import { HOME_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

export default function NewDrops({
  newPostImage,
}: {
  newPostImage: HOME_QUERYResult["newPostImages"];
}) {
  if (!newPostImage?.length) return null;

  const images = newPostImage.slice(0, 4);
  const count = images.length;

  return (
    <section className="relative mx-auto w-full max-w-7xl bg-background px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Section heading */}
      <div className="mb-4 flex items-center justify-between border-b border-foreground/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-red-600" />

          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/60 sm:text-[11px]">
            New drop
          </span>
        </div>

        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/40">
          0{count} / 04
        </span>
      </div>

      {/* Image composition */}
      <div
        className={[
          "relative grid w-full gap-2 sm:gap-3",
          count === 1 && "grid-cols-1",
          count === 2 && "grid-cols-2",
          count === 3 && "grid-cols-2",
          count === 4 && "grid-cols-2",
          "lg:max-h-[min(720px,72vh)]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {images.map((item, index) => {
          if (!item.image.url) return null;

          const imageUrl = urlFor(item.image.url).url();

          const layout =
            count === 1
              ? "col-span-2 aspect-[16/9]"
              : count === 2
                ? "aspect-[4/5]"
                : count === 3
                  ? index === 0
                    ? "row-span-2 aspect-[4/5] sm:aspect-auto"
                    : "aspect-[4/5]"
                  : "aspect-[4/5]";

          return (
            <figure
              key={`${item.image.url}-${index}`}
              className={`group relative overflow-hidden bg-muted ${layout}`}
            >
              <Image
                src={imageUrl}
                alt={item.image.alt || "New drop artwork"}
                fill
                priority={index === 0}
                sizes={
                  count === 1
                    ? "(min-width: 1024px) 1152px, 100vw"
                    : count === 2
                      ? "(min-width: 1024px) 576px, 50vw"
                      : "(min-width: 1024px) 576px, 50vw"
                }
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(0.23,1,0.32,1)]
                  group-hover:scale-[1.025]
                "
              />

              {/* Very subtle image treatment */}
              <div className="pointer-events-none absolute inset-0 bg-black/3" />
            </figure>
          );
        })}

        {/* Typography */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
          <div className="ml-auto w-full max-w-190">
            <p
              className="
                text-right text-[clamp(4.5rem,11vw,9.5rem)] font-black uppercase leading-[0.72] tracking-[-0.075em]  text-white mix-blend-difference
              "
            >
              New
            </p>

            <p
              className=" text-right text-[clamp(4.5rem,11vw,9.5rem)]  font-black uppercase leading-[0.72] tracking-[-0.075em]
              text-red-600
              "
            >
              Drop
            </p>
          </div>
        </div>

        {/* Small editorial label */}
        <div className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6 lg:left-8 lg:top-8">
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white mix-blend-difference sm:text-[10px]">
            Just landed
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/40 sm:text-[10px]">
          Latest collection
        </span>

        <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/40 sm:text-[10px]">
          Scroll to explore ↓
        </span>
      </div>
    </section>
  );
}
