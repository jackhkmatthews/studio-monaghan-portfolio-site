import "@/styles/globals.css";

import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { initialValues } from "@/sanity/lib/initial-values";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { SETTINGS_QUERY } from "@/sanity/queries";
import { ScrollendPolyfill } from "./scrollend-polyfill";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollendPolyfill />
      {children}
    </>
  );
}
