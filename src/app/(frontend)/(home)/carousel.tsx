"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useRef } from "react";
import { CarouselPicture } from "./carousel-picture";
import { SanityImageSource } from "@sanity/asset-utils";
import { Slug } from "@/sanity/types";
import Link from "next/link";
import { textClasses } from "@/styles/textClasses";
import { ctaClasses } from "@/styles/ctaClasses";
import { changeSlide } from "./change-slide";

export function Carousel({
  images,
  className,
  ...rest
}: {
  images?:
    | {
        asset?: SanityImageSource;
        alt?: string;
        _key: string;
        photographer?: string;
        project?: { slug: Slug | null; label: string | null };
      }[]
    | null;
} & ComponentProps<"ul">) {
  const scrollContainer = useRef<HTMLUListElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // changeSlide(scrollContainer.current, "down", images?.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [images?.length]);

  return (
    <ul
      onScroll={(e) => console.log("hi", e)}
      ref={scrollContainer}
      className={cn(
        "flex overflow-y-scroll snap-y snap-mandatory [scrollbar-width:none] flex-col",
        className
      )}
      {...rest}
    >
      {images?.map((image, index) => {
        return (
          <figure
            className="h-full w-full basis-full shrink-0 snap-center relative"
            key={`${image._key}_${index}`}
          >
            <CarouselPicture
              className="h-full w-full"
              image={image?.asset || ""}
              alt={image?.alt || ""}
            />
            <figcaption
              className={cn(
                textClasses.body,
                "absolute left-8 bottom-8 text-white"
              )}
            >
              {image.project?.label && (
                <>
                  Client:{" "}
                  <Link
                    className={ctaClasses.link}
                    href={`/work/${image.project?.slug?.current}`}
                  >
                    {image.project?.label}
                  </Link>
                  .
                </>
              )}
              {image.photographer && <> Photographer: {image.photographer}.</>}
            </figcaption>
          </figure>
        );
      })}
    </ul>
  );
}
