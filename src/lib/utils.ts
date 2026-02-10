import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDimensions(
  aspectRatio: number,
  maxWidth: number,
  maxHeight: number,
) {
  // Try fitting to max width first
  let width = maxWidth;
  let height = Math.floor(maxWidth / aspectRatio);

  // If height exceeds max, scale down to fit max height
  if (height > maxHeight) {
    height = maxHeight;
    width = Math.floor(maxHeight * aspectRatio);
  }

  return { width, height };
}



export function buildSrcSet(
  image: SanityImageSource,
  width: number,
  height: number,
): string {
  const url = (w: number, h: number) =>
    urlFor(image).width(w).height(h).fit("crop").auto("format").url();
  return [`${url(width, height)} 1x`, `${url(width * 2, height * 2)} 2x`].join(
    ", ",
  );
}