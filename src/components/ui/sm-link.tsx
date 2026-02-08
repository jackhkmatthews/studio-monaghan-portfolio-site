import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-[1px] font-serif underline-offset-4",
  {
    variants: {
      variant: {
        default: "text-primary hover:underline",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "px-2 py-1 has-[>svg]:px-3 text-base",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-base",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-lg",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function SMLink({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof linkVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn(linkVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { SMLink, linkVariants };
