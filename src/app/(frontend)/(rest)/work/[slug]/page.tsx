import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY, PROJECTS_SLUGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { textClasses } from "@/styles/textClasses";
import { getImageDimensions } from '@sanity/asset-utils';
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
    <main className="flex flex-col gap-8 flex-1 pb-8 lg:pb-10 lg:gap-8">
      <h1 className={cn(textClasses.h1, "px-4 lg:px-8")}>
        {project.title}
      </h1>


      {project.bannerImage && (
        <ClientImage
          className="w-full object-cover aspect-square md:aspect-video lg:aspect-[3/1] max-h-[50vh]"
          src={urlFor(project.bannerImage).url()}
          alt={project.bannerImage?.alt || project.title || ""}
          width={getImageDimensions(project.bannerImage.asset?._ref || "").width}
          height={getImageDimensions(project.bannerImage.asset?._ref || "").height}
          sizes="100vw"
          placeholder={
            project.bannerImage.lqip
              ? `data:image/${project.bannerImage.lqip.split("data:image/")[1]}`
              : "empty"
          }
        />
      )}


      {Array.isArray(project.sections) && project.sections.length > 0 && (
        <div className="grid gap-x-2 lg:gap-x-4 gap-y-6 lg:gap-y-8 px-4 lg:px-8 grid-cols-4">
          {project.sections.map((section) => {
            const key = section._key;
            // Gallery section
            if (section && section._type === "gallerySection") {
              const images = section.images || [];
              const count = images.length;
              const orientation = section.orientation || "landscape";
              const twoImagePosition = section.twoImagePosition || "center";
              
              let aspectRatio = 0;
              let width = 0;
              
              // Calculate aspect ratio based on count and orientation
              if (count === 1) {
                // 1 full width image
                aspectRatio = orientation === "portrait" ? 3 / 4 : 2 / 1;
                width = 3000;
              } else if (count === 2) {
                // 2 images side by side
                aspectRatio = orientation === "portrait" ? 2 / 3 : 3 / 2;
                width = 1500;
              } else {
                // 4 images in grid
                aspectRatio = orientation === "portrait" ? 3 / 4 : 4 / 3;
                width = 1000;
              }
              
              const height = Math.floor(width / aspectRatio);
              
              // Wrap gallery section in a subgrid container to ensure it's on its own row
              return (
                <div key={key} className="col-span-full grid grid-cols-subgrid gap-y-2">
                  {images.map((img, index) => {
                    if (!img || !img.asset) return null;
                    const url = urlFor(img)
                      .width(width)
                      .height(height)
                      .auto("format")
                      .url();

                    // Determine column positioning
                    let colSpan = "col-span-full";
                    let colStart = "";
                    
                    if (count === 1) {
                      colSpan = "col-span-full";
                    } else if (count === 2) {
                      if (twoImagePosition === "left") {
                        colSpan = "col-span-2 md:col-span-1";
                        // Images will naturally flow left
                      } else if (twoImagePosition === "right") {
                        colSpan = "col-span-2 md:col-span-1";
                        colStart = index === 0 ? "md:col-start-3" : "";
                      } else {
                        // center - use full width 2-column layout
                        colSpan = "col-span-2";
                      }
                    } else if (count === 4) {
                      colSpan = "col-span-2 md:col-span-1";
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
                        className={cn("w-full", colSpan, colStart)}
                      />
                    );
                  })}
                </div>
              );
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
