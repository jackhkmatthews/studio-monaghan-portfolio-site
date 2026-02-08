import { urlFor } from "@/sanity/lib/image";
import { getImageProps } from "next/image";
import { getImageDimensions, SanityImageSource } from "@sanity/asset-utils";
import { ClientImage } from "@/components/client-image";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function CarouselPicture({
  image,
  alt,
  className,
  imageClassName,
  ...props
}: {
  image: SanityImageSource;
  alt: string;
  imageClassName?: string;
} & ComponentProps<"picture">) {
  const common = {
    alt,
    // TODO: on mobile, should this be like 200vw?
    sizes: "100vw",
  };
  const dimensions = getImageDimensions(image);
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: dimensions?.width,
    height: dimensions?.height,
    src: urlFor(image || {}).url(),
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: 1000,
    height: 1000,
    src: urlFor(image || {})
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
    src: urlFor(image || {})
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
    <picture className={cn(className)} {...props}>
      <source media="(width < 500px)" srcSet={mobile} />
      <source media="(width < 750px)" srcSet={tablet} />
      <source media="(width >= 750px)" srcSet={desktop} />
      <ClientImage
        {...mobileImgProps}
        className={cn(
          "object-cover w-full h-dvh border-4 border-solid border-gray-brand",
          imageClassName,
        )}
      />
    </picture>
  );
}
