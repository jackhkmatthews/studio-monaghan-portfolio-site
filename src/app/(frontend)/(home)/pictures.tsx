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
    document?.body.addEventListener("scroll", onScroll);
    document?.body.addEventListener("scrollend", onScrollend);
    return () => {
      document.body.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("scrollend", onScrollend);
    };
  }, []);

  return (
    <ul className={cn("flex flex-col", className)} {...rest}>
      {images?.map((image, index) => {
        return (
          <figure
            className={cn("w-full basis-full shrink-0 relative snap-center")}
            key={`${image._key}_${index}`}
          >
            <CarouselPicture
              className="w-full"
              image={image?.asset || ""}
              alt={image?.alt || ""}
            />
            <figcaption
              className={cn(
                textClasses.body,
                "absolute left-0 bottom-8 text-white px-4 lg:px-8 transition-opacity",
                isScrolling ? "opacity-0 duration-75" : "duration-500",
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
