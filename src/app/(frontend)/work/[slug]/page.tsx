import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY, PROJECTS_SLUGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { textClasses } from "@/styles/textClasses";
import { cn } from "@/lib/utils";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/lib/portable-text-components";
import { notFound } from "next/navigation";
import { ClientImage } from "@/components/client-image";
import { client } from "@/sanity/lib/client";

export async function generateStaticParams() {
  const items = await client.fetch(PROJECTS_SLUGS_QUERY);

  return items.map((item) => ({
    slug: item.slug?.current,
  }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-4 flex-1 py-8 lg:py-10 lg:gap-8">
      <h1 className={cn(textClasses.h1, "px-2 lg:px-8 lg:absolute")}>
        {project.title}
      </h1>

      {Array.isArray(project.sections) && project.sections.length > 0 && (
        <div className="grid gap-x-2 lg:gap-x-4 gap-y-6 lg:gap-y-8 px-2 lg:px-8 grid-cols-4">
          {project.sections.map((section, index) => {
            const key = section._key;
            // Gallery section
            // TODO: be oppionated about the image aspect ratios
            if (section && section._type === "gallerySection") {
              const images = section.images || [];
              const count = images.length;
              let aspectRatio = 0;
              let width = 0;
              if (count === 1) {
                // 1 full width image
                aspectRatio = 2 / 1;
                width = 3000;
              } else if (count === 2) {
                // 2 images side by side
                aspectRatio = 3 / 2;
                width = 1500;
              } else {
                // 4 images side by side
                aspectRatio = 2 / 3;
                width = 1000;
              }
              const height = Math.floor(width / aspectRatio);
              return images.map((img) => {
                if (!img || !img.asset) return null;
                const url = urlFor(img)
                  .width(width)
                  .height(height)
                  // .quality(85)
                  .auto("format")
                  .url();

                if (index === 0) {
                  console.log(img, url);
                }
                return (
                  <ClientImage
                    key={img._key}
                    src={url}
                    alt={img?.alt || project.title || ""}
                    width={width}
                    height={height}
                    placeholder={
                      img.lqip
                        ? `data:image/${img.lqip.split("data:image/")[1]}`
                        : "empty"
                    }
                    className={cn("w-full", {
                      "col-span-full": images.length === 1,
                      "col-span-2": images.length === 2,
                      "col-span-1": images.length === 4,
                    })}
                  />
                );
              });
            } else if (section._type === "textBlock") {
              return (
                <div
                  key={key}
                  className={cn(
                    textClasses.portableText,
                    "col-span-full lg:col-span-2 lg:col-start-3 max-w-prose"
                  )}
                >
                  <PortableText
                    value={section.content || []}
                    components={components}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}
    </main>
  );
}
