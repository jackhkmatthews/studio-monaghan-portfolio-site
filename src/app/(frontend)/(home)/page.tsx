import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/queries";
import { cn } from "@/lib/utils";
import { CarouselPicture } from "./carousel-picture";
import { textClasses } from "@/styles/textClasses";
import Link from "next/link";
import { ctaClasses } from "@/styles/ctaClasses";

export default async function Home() {
  const { data: home } = await sanityFetch({ query: HOME_QUERY });
  const images = (home?.carouselImages || [])
    .toSorted
    // () => Math.random() - 0.5
    ();

  return (
    <main className="min-h-full">
      <ul className={cn("flex flex-col")}>
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
                {image.photographer && (
                  <> Photographer: {image.photographer}.</>
                )}
              </figcaption>
            </figure>
          );
        })}
      </ul>
    </main>
  );
}
