import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { textClasses } from "@/styles/textClasses";
import { cn } from "@/lib/utils";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/lib/portable-text-components";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getImageAsset } from "@sanity/asset-utils";

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
    <main className="flex flex-col gap-4 flex-1 py-2 pb-10 lg:pt-10 lg:gap-8">
      <h1 className={cn(textClasses.h1, "px-2 lg:px-4")}>{project.title}</h1>

      {Array.isArray(project.sections) && project.sections.length > 0 && (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-2 lg:px-4 lg:grid-cols-4">
          {project.sections.map((section) => {
            const key = section._key;
            // Gallery section
            // TODO: be oppionated about the image aspect ratios
            if (section && section._type === "gallerySection") {
              const images = section.images || [];
              const count = images.length;
              const width = count === 1 ? 1200 : count === 2 ? 600 : 400;
              return images.map((img) => {
                if (!img || !img.asset) return null;
                const imageAsset = getImageAsset(img.asset);
                const aspectRatio = imageAsset.metadata.dimensions.aspectRatio;
                const height = Math.floor(width / aspectRatio);
                return (
                  <Image
                    key={img._key}
                    src={urlFor(img)
                      .width(width)
                      .height(height)
                      .quality(85)
                      .auto("format")
                      .url()}
                    alt={img?.alt || project.title || ""}
                    width={width}
                    height={height}
                    className={cn("w-full col-span-full", {
                      "lg:col-span-2": images.length === 2,
                      "lg:col-span-1": images.length === 4,
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
                    "col-span-full lg:col-span-2 lg:col-start-3"
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
