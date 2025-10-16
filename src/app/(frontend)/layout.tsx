import "@/styles/globals.css";
import { textClasses } from "@/styles/textClasses";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/queries";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY });
  return (
    <>
      <header className="px-2 flex justify-between items-center gap-4">
        <Link href="/" className={cn(textClasses.wordMark, "uppercase")}>
          {settings?.title}
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link
                className={cn(
                  textClasses.body,
                  "hover:underline underline-offset-3"
                )}
                href="/work"
              >
                Work
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
      {/* <footer></footer> */}
      <SanityLive />
    </>
  );
}
