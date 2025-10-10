import "@/styles/globals.css";
import { textClasses } from "@/styles/textClasses";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/queries";
import { cn } from "@/lib/utils";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY });
  return (
    <>
      <header className="px-2 flex justify-between items-center">
        <h1 className={cn(textClasses.h1, "uppercase")}>{settings?.title}</h1>
        {/* <nav>
            <ul>
              <li>
                <SMLink asChild>
                  <Link href="/about">About</Link>
                </SMLink>
              </li>
            </ul>
          </nav> */}
      </header>
      {children}
      {/* <footer></footer> */}
      <SanityLive />
    </>
  );
}
