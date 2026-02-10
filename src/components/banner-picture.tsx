import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/asset-utils";
import { ClientImage } from "@/components/client-image";
import { ComponentProps } from "react";
import { buildSrcSet, cn } from "@/lib/utils";
import { BANNER_IMAGE_SIZES } from "@/lib/image-sizes";
import { BREAKPOINTS } from "@/styles/breakpoints";

export function BannerPicture({
  image,
  alt,
  className,
  imageClassName,
  lqip,
  ...props
}: {
  image: SanityImageSource;
  alt: string;
  imageClassName?: string;
  lqip?: string;
} & ComponentProps<"picture">) {
  const defaultSrcSet = buildSrcSet(
    image,
    BANNER_IMAGE_SIZES.default.width,
    BANNER_IMAGE_SIZES.default.height,
  );
  const mdSrcSet = buildSrcSet(
    image,
    BANNER_IMAGE_SIZES.md.width,
    BANNER_IMAGE_SIZES.md.height,
  );
  const lgSrcSet = buildSrcSet(
    image,
    BANNER_IMAGE_SIZES.lg.width,
    BANNER_IMAGE_SIZES.lg.height,
  );

  const defaultSrc = urlFor(image)
    .width(BANNER_IMAGE_SIZES.default.width)
    .height(BANNER_IMAGE_SIZES.default.height)
    .fit("crop")
    .auto("format")
    .url();

  const mdMin = BREAKPOINTS.md;
  const lgMin = BREAKPOINTS.lg;

  return (
    <picture className={cn(className)} {...props}>
      <source media={`(max-width: ${mdMin - 1}px)`} srcSet={defaultSrcSet} />
      <source
        media={`(min-width: ${mdMin}px) and (max-width: ${lgMin - 1}px)`}
        srcSet={mdSrcSet}
      />
      <source media={`(min-width: ${lgMin}px)`} srcSet={lgSrcSet} />
      <ClientImage
        src={defaultSrc}
        alt={alt}
        width={BANNER_IMAGE_SIZES.default.width}
        height={BANNER_IMAGE_SIZES.default.height}
        sizes="100vw"
        priority={true}
        unoptimized={true}
        placeholder={
          lqip
            ? (`data:image/${lqip.split("data:image/")[1]}` as const)
            : "empty"
        }
        className={cn(
          "w-full object-cover aspect-video md:aspect-[2/1] lg:aspect-[3/1]",
          imageClassName,
        )}
      />
    </picture>
  );
}
