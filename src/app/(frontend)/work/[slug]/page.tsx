import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { textClasses } from "@/styles/textClasses";
import { cn } from "@/lib/utils";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/lib/portable-text-components";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug: params.slug },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-4 flex-1 px-2 py-2 pb-10">
      <h1 className={cn(textClasses.h1)}>{project.title}</h1>

      {project.coverImage && (
        <div className="relative w-full h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={urlFor(project.coverImage)
              .width(1200)
              .height(600)
              .quality(85)
              .auto("format")
              .url()}
            alt={project.coverImage.alt || project.title || ""}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {project.body && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={project.body} components={components} />
        </div>
      )}
    </main>
  );
}
