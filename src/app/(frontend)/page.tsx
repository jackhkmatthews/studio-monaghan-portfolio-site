import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/queries";
import { textClasses } from "@/styles/textClasses";
import { getImageProps } from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";

export default async function Home() {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY });
  const common = {
    alt: settings?.homepageImage?.alt || "",
    sizes: "(width <= 750px) 100vw, 75vw",
  };
  const dimensions = getImageDimensions(settings?.homepageImage?.asset || "");
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: dimensions?.width,
    height: dimensions?.height,
    quality: 80,
    src: urlFor(settings?.homepageImage || {}).url(),
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: 1000,
    height: 1000,
    quality: 70,
    src: urlFor(settings?.homepageImage || {})
      .width(1000)
      .height(1000)
      .crop("center")
      .fit("crop")
      .url(),
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 500,
    height: 1000,
    quality: 70,
    src: urlFor(settings?.homepageImage || {})
      .width(750)
      .height(1334)
      .crop("center")
      .fit("crop")
      .url(),
  });
  return (
    <main className="flex flex-col gap-4 flex-1">
      <p className={cn(textClasses.body, "px-2")}>{settings?.description}</p>
      {settings?.homepageImage ? (
        <picture className="flex-1 flex flex-col relative lg:px-2 lg:w-3/4 xl:w-2/3">
          <source media="(width < 500px)" srcSet={mobile} />
          <source media="(width < 750px)" srcSet={tablet} />
          <source media="(width >= 750px)" srcSet={desktop} />
          <img
            {...rest}
            alt={settings?.homepageImage?.alt || ""}
            className="object-cover absolute inset-0 h-full w-full lg:relative"
          />
        </picture>
      ) : null}
    </main>
  );
}
