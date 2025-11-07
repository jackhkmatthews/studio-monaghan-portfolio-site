// Fonts change at lg breakpoint

export const textClasses = {
  wordMark: "font-wordmark text-2xl lg:text-3xl font-bold leading-none",
  h1: "font-serif text-base font-bold lg:text-xl",
  h3: "font-serif text-base font-bold lg:text-xl",
  navLink: "font-wordmark text-base lg:text-xl",
  body: "font-serif text-base lg:text-xl",
  portableText: "prose lg:prose-xl font-serif prose-a:font-normal",
  portableTextFooter:
    "text-xs prose-sm font-serif leading-none prose-a:font-normal",
} as const;
