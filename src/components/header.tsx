import Link from "next/link";
import { cn } from "@/lib/utils";
import { textClasses } from "@/styles/textClasses";
import { ComponentProps } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/queries";

export async function Header({
  className,
  ...props
}: ComponentProps<"header">) {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY });
  return (
    <header
      className={cn(
        "px-4 pt-4 md:pt-6 lg:pt-8 flex justify-between items-baseline gap-4 lg:px-8 z-10 w-full",
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className={cn(textClasses.wordMark)}
        style={{ lineHeight: "1" }}
      >
        {settings?.title || ""}
      </Link>

      <nav>
        <ul className="flex gap-3 lg:gap-8">
          <li className="contents">
            <Link
              className={cn(
                textClasses.navLink,
                "hover:underline underline-offset-3"
              )}
              href="/work"
            >
              Work
            </Link>
          </li>
          <li className="contents">
            <Link
              className={cn(
                textClasses.navLink,
                "hover:underline underline-offset-3"
              )}
              href="/about"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
