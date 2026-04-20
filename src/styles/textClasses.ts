// Fonts change at lg breakpoint

export const textClasses = {
  wordMark: "font-serif text-base md:text-lg lg:text-3xl font-medium leading-none",
  h1: "font-serif text-lg font-bold lg:text-2xl",
  h3: "font-serif text-base font-bold lg:text-xl",
  h4: "font-serif text-base font-medium",
  navLink: "font-serif text-sm md:text-base lg:text-xl font-normal",
  body: "font-serif text-base lg:text-xl",
  portableText: "prose font-serif prose-a:font-normal max-w-[50ch] tracking-tight underline-offset-4 xl:prose-lg",
  portableTextFooter:
    "text-xs prose-sm font-serif leading-none prose-a:font-normal",
} as const;
