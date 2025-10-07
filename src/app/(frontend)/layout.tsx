import "@/styles/globals.css";
import { textClasses } from "@/styles/textClasses";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/queries";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY });
  return (
    <>
      <header className="px-2 py-4 flex justify-between items-center">
        <h1 className={textClasses.h1}>{settings?.title}</h1>
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
      <main>{children}</main>
      <footer></footer>
      <SanityLive />
    </>
  );
}
