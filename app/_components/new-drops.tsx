import Image from "next/image";
import { HOME_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

export default function NewDrops({
  newPostImage,
}: {
  newPostImage: HOME_QUERYResult["newPostImages"];
}) {
  if (!newPostImage?.length) return null;

  const isSingleImage = newPostImage.length === 1;

  return (
    <section className="relative mx-auto w-full max-w-7xl bg-background lg:min-h-screen lg:flex lg:items-center">
      {/* Image grid */}
      <div
        className={`grid w-full ${
          isSingleImage ? "grid-cols-1" : "grid-cols-2"
        } lg:max-h-[85vh]`}
      >
        {newPostImage.map((item) => (
          <div
            key={item.image.alt}
            className={`relative ${
              isSingleImage ? "aspect-video" : "aspect-3/4"
            }`}
          >
            <Image
              src={item.image.url ? urlFor(item.image.url).url() : ""}
              alt={item.image.alt || "New drop artwork"}
              fill
              priority
              className="object-cover contrast-110 brightness-95"
            />
          </div>
        ))}
      </div>

      {/* Center text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-red-600 ring-red-800 ring-1 shadow-2xl text-shadow-red-900 font-medium leading-[0.8] text-[18vw] md:text-[12vw] lg:text-[9vw] tracking-tight">
          NEW
          <br />
          DrOP
        </p>
      </div>
    </section>
  );
}
