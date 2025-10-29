import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { textClasses } from "@/styles/textClasses";

export default async function AboutPage() {
  const { data: about } = await sanityFetch({ query: ABOUT_QUERY });

  return (
    <main className="gap-6 flex-1 grid grid-cols-1 px-2 lg:px-8 lg:grid-cols-[1fr_1fr] py-8 lg:py-10 lg:gap-x-20">
      {about?.section?.map((section) => (
        <section
          key={section._key}
          className="flex flex-col gap-2 lg:grid lg:col-span-full lg:grid-cols-subgrid lg:gap-[inherit]"
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
