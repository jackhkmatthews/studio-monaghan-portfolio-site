import type { Metadata } from "next";
import "@/styles/globals.css";
import "@af-utils/scrollend-polyfill";
import { cn } from "@/lib/utils";

import localFont from "next/font/local";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { initialValues } from "@/sanity/lib/initial-values";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { SETTINGS_QUERY } from "@/sanity/queries";

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

const annexxus_demo = localFont({
  src: "../../../public/fonts/AnnexxusRegular-Demo.woff2",
  variable: "--font-annexxus-regular-demo",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full bg-gray-brand overflow-y-hidden overscroll-none"
    >
      <body
        className={cn(
          abc_otto_variable_trial.variable,
          annexxus_demo.variable,
          `antialiased h-full min-h-lvh flex flex-col gap-12 lg:gap-16 bg-gray-brand overflow-y-scroll snap-y snap-mandatory relative overscroll-none`
        )}
      >
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
