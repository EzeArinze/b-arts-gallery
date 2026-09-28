"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

type HoverExpandImage = {
  src: string;
  alt: string;
  code: string;
};

type HoverExpandProps = {
  images: HoverExpandImage[];
  className?: string;
};

const HoverExpand_001 = ({ images, className }: HoverExpandProps) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.15,
      }}
      className={cn("relative w-full", className)}
    >
      <div className="flex w-full items-center justify-center gap-1.5 overflow-hidden">
        {images.map((image, index) => {
          const isActive = activeImage === index;

          return (
            <motion.div
              key={`${image.src}-${index}`}
              className="relative min-w-0 cursor-pointer overflow-hidden"
              initial={false}
              animate={{
                flexGrow: isActive ? 5 : 1,
                flexBasis: 0,
                height: "clamp(300px, 48vw, 560px)",
              }}
              transition={{
                duration: 0.45,
                ease: [0.23, 1, 0.32, 1],
              }}
              onMouseEnter={() => setActiveImage(index)}
              onClick={() => setActiveImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover"
              />

              <AnimatePresence>
                {isActive && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.05,
                      }}
                      className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3 sm:p-4"
                    >
                      <span className="text-[10px] uppercase tracking-[0.15em] text-white/60">
                        {image.code}
                      </span>

                      <span className="text-[10px] uppercase tracking-[0.15em] text-white/80">
                        View
                      </span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export { HoverExpand_001 };
