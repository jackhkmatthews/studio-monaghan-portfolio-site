import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { textClasses } from "@/styles/textClasses";

export default async function AboutPage() {
  const { data: about } = await sanityFetch({ query: ABOUT_QUERY });

  return (
    <main className="gap-6 flex-1 grid grid-cols-1 px-2 lg:px-4 lg:grid-cols-[max-content_3fr] py-2 lg:py-4 lg:gap-x-20">
      {about?.section?.map((section) => (
        <section
          key={section._key}
          className="flex flex-col gap-2 lg:grid lg:grid-cols-subgrid lg:col-span-2 lg:gap-[inherit]"
        >
          <h2 className={cn(textClasses.h3)}>{section.title}</h2>
          <div className={cn(textClasses.portableText)}>
            <PortableText value={section.content || []} />
          </div>
        </section>
      ))}
    </main>
  );
}
