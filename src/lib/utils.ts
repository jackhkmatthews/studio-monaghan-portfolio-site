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
