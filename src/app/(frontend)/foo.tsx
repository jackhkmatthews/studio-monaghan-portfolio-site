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
  return <></>;
}
