import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

import localFont from "next/font/local";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { initialValues } from "@/sanity/lib/initial-values";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { SETTINGS_QUERY } from "@/sanity/queries";
import Link from "next/link";
import { textClasses } from "@/styles/textClasses";

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || initialValues.title;
  const description = settings?.description || initialValues.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const abc_otto_variable_trial = localFont({
  src: "../../../public/fonts/ABCOttoVariable-Trial.woff2",
  variable: "--font-abco-otto-variable-trial",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY });
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          abc_otto_variable_trial.variable,
          `antialiased min-h-full flex flex-col pt-4 gap-6`
        )}
      >
        <header className="px-2 flex justify-between items-center gap-4 lg:px-4">
          <Link href="/" className={cn(textClasses.wordMark, "uppercase")}>
            {settings?.title}
          </Link>

          <nav>
            <ul className="flex gap-4">
              <li>
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
              <li>
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
        {children}
        {/* <footer></footer> */}
        <SanityLive />
      </body>
    </html>
  );
}
