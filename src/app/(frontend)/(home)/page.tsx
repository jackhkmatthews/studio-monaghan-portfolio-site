import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/queries";
import { Pictures } from "./pictures";

export default async function Home() {
  const { data: home } = await sanityFetch({ query: HOME_QUERY });
  const images = (home?.carouselImages || [])
    .toSorted
    // () => Math.random() - 0.5
    ();

  return (
    <main className="min-h-full">{images && <Pictures images={images} />}</main>
  );
}
