import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { textClasses } from "@/styles/textClasses";

export default async function AboutPage() {
  const { data: about } = await sanityFetch({ query: ABOUT_QUERY });

  return (
    <main className="flex flex-col gap-4 flex-1">
      {about?.section?.map((section) => (
        <div key={section._key} className="px-2 lg:px-4">
          <h2 className={cn(textClasses.h2)}>{section.title}</h2>
          <PortableText value={section.content || []} />
        </div>
      ))}
    </main>
  );
}
