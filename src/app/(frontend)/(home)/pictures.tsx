"use client";

import { cn } from "@/lib/utils";
import { CarouselPicture } from "./carousel-picture";
import { textClasses } from "@/styles/textClasses";
import Link from "next/link";
import { ctaClasses } from "@/styles/ctaClasses";
import { ComponentProps, useEffect, useState } from "react";
import { SanityImageSource } from "@sanity/asset-utils";
import { Slug } from "@/sanity/types";

export function Pictures({
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
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolling(true);
    }
    function onScrollend() {
      setIsScrolling(false);
    }
    document?.addEventListener("scroll", onScroll);
    document?.addEventListener("scrollend", onScrollend);
    return () => {
      document.removeEventListener("scroll", onScroll);
      document.removeEventListener("scrollend", onScrollend);
    };
  }, []);

  return (
    <ul className={cn("flex flex-col", className)} {...rest}>
      {images?.map((image, index) => {
        return (
          <figure
            className="w-full basis-full shrink-0 snap-center relative"
            key={`${image._key}_${index}`}
          >
            <CarouselPicture
              className="w-full"
              imageClassName="h-lvh"
              image={image?.asset || ""}
              alt={image?.alt || ""}
            />
            <figcaption
              className={cn(
                textClasses.body,
                "absolute left-0 bottom-8 text-white px-4 lg:px-8 inline-flex gap-2 transition-opacity",
                isScrolling ? "opacity-0 duration-75" : "duration-500"
              )}
            >
              {image.project?.label && (
                <span>
                  Client:{" "}
                  <Link
                    className={ctaClasses.link}
                    href={`/work/${image.project?.slug?.current}`}
                  >
                    {image.project?.label}
                  </Link>
                  .
                </span>
              )}
              {image.photographer && (
                <span>Photographer: {image.photographer}.</span>
              )}
            </figcaption>
          </figure>
        );
      })}
    </ul>
  );
}
