import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/queries";
import { Carousel } from "./carousel";

export default async function Home() {
  const { data: home } = await sanityFetch({ query: HOME_QUERY });
  const images = (home?.carouselImages || []).toSorted(
    () => Math.random() - 0.5
  );

  return (
    <main className="h-full lg:box-content lg:pb-40">
      <Carousel images={[...images, images[0]]} className="h-full w-full" />
    </main>
  );
}
