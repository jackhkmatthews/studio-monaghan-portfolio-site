"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

export function ClientImage({
  alt,
  onLoad,
  className,
  ...props
}: {} & ComponentProps<typeof Image>) {
  return (
    <Image
      alt={alt}
      className={cn("opacity-0 transition-opacity", className)}
      onLoad={(e) => {
        e.currentTarget.classList.remove("opacity-0");
        onLoad?.(e);
      }}
      {...props}
    />
  );
}
