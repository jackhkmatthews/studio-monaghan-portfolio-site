import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { textClasses } from "@/styles/textClasses";
import { getImageProps } from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { HOME_QUERY } from "@/sanity/queries";
import { ClientImage } from "@/components/client-image";

export default async function Home() {
  const { data: home } = await sanityFetch({ query: HOME_QUERY });
  const common = {
    alt: home?.image?.alt || "",
    // TODO: on mobile, should this be like 200vw?
    sizes: "100vw",
  };
  const dimensions = getImageDimensions(home?.image?.asset || "");
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: dimensions?.width,
    height: dimensions?.height,
    src: urlFor(home?.image || {}).url(),
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: 1000,
    height: 1000,
    src: urlFor(home?.image || {})
      .width(1000)
      .height(1000)
      .crop("center")
      .fit("crop")
      .url(),
  });
  // Can't use ..rest from getImageProps because it already optimises URLs which then happens again inside the ClientImage component e.g. double /_next/image/_next/image/ urls
  const mobileImgProps = {
    ...common,
    priority: true,
    width: 750,
    height: 1334,
    src: urlFor(home?.image || {})
      .width(750)
      .height(1334)
      .crop("center")
      .fit("crop")
      .url(),
  };
  const {
    props: { srcSet: mobile },
  } = getImageProps({
    ...mobileImgProps,
  });
  return (
    <main className="flex flex-col gap-8 flex-1 md:pb-2 lg:pb-8">
      {home?.image ? (
        // TODO: add placeholder with lqip
        <picture className="flex-1 flex flex-col relative md:mx-4 lg:px-8 lg:w-full lg:mx-0">
          <source media="(width < 500px)" srcSet={mobile} />
          <source media="(width < 750px)" srcSet={tablet} />
          <source media="(width >= 750px)" srcSet={desktop} />
          <ClientImage
            {...mobileImgProps}
            className="object-cover absolute inset-0 h-full w-full lg:relative"
          />
        </picture>
      ) : null}
    </main>
  );
}
