import { sanityFetch } from "@/sanity/lib/live";
import {
  PROJECT_QUERY,
  PROJECTS_SLUGS_QUERY,
  WORK_QUERY,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { textClasses } from "@/styles/textClasses";
import { ctaClasses } from "@/styles/ctaClasses";
import { cn } from "@/lib/utils";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/lib/portable-text-components";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { ClientImage } from "@/components/client-image";
import { BannerPicture } from "@/components/banner-picture";
import type { Project } from "@/components/project-rows";
import Link from "next/link";
import { getImageDimensions } from "@sanity/asset-utils";
import { getDimensions } from "@/lib/utils";
import { ComponentProps } from "react";

export async function generateStaticParams() {
  const items = await client.fetch(PROJECTS_SLUGS_QUERY);

  return items.map((item) => ({
    slug: item.slug?.current,
  }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function ProjectCard({
  project,
  title,
  className,
  ...props
}: ComponentProps<"div"> & { project: Project; title: string }) {
  const href = `/work/${project.slug?.current}`;
  const dims = getImageDimensions(project.coverImage?.asset?._ref || "");
  const { width, height } = getDimensions(1.2, dims.width, dims.height);
  const url = urlFor(project.coverImage || {})
    .height(height)
    .width(width)
    .auto("format")
    .url();

  return (
    <div className={cn("flex flex-col gap-2 relative", className)} {...props}>
      <Link href={href} className={cn(textClasses.h4, "hover:opacity-80")}>
        {title}
        <span className="absolute inset-0" />
      </Link>
      {project.coverImage && (
        <ClientImage
          className="w-full h-auto hover:opacity-90 transition-opacity"
          placeholder={
            project.coverImage.lqip
              ? `data:image/${project.coverImage.lqip.split("data:image/")[1]}`
              : "empty"
          }
          src={url}
          sizes="(max-width: 768px) 100vw, 25vw"
          alt={project.coverImage.alt || project.title || ""}
          width={width}
          height={height}
        />
      )}
    </div>
  );
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

  // Fetch all projects to find the next one
  const { data: workData } = await sanityFetch({ query: WORK_QUERY });
  const projectRows = workData?.projectRows || [];

  // Flatten all projects into a single array
  const allProjects: Project[] = projectRows.flatMap(
    (row) => row.projects || [],
  );

  // Find current project index and get next/previous projects
  const currentIndex = allProjects.findIndex((p) => p.slug?.current === slug);
  const nextProject =
    currentIndex !== -1 && allProjects.length > 0
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;
  const previousProject =
    currentIndex !== -1 && allProjects.length > 0
      ? allProjects[
          (currentIndex - 1 + allProjects.length) % allProjects.length
        ]
      : null;

  const lastTextBlockIndex = Array.isArray(project.sections)
    ? project.sections.reduce<number>((last, s, i) => {
        return s?._type === "textBlock" ? i : last;
      }, -1)
    : -1;

  return (
    <main className="flex flex-col gap-8 flex-1 pb-8 lg:pb-10 lg:gap-8">
      {project.bannerImage && (
        <BannerPicture
          className="px-4 lg:px-8"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          image={project.bannerImage as any}
          alt={project.bannerImage?.alt || project.title || ""}
          lqip={project.bannerImage.lqip || undefined}
        />
      )}

      {Array.isArray(project.sections) && project.sections.length > 0 && (
        <div className="grid gap-x-2 lg:gap-x-4 gap-y-6 lg:gap-y-8 px-4 lg:px-8 grid-cols-4">
          <h1
            className={cn(
              textClasses.h1,
              "col-span-full lg:col-start-1 lg:col-span-2",
            )}
          >
            {project.title}
          </h1>
          {project.sections.map((section, sectionIndex) => {
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
                <div
                  key={key}
                  className="col-span-full grid grid-cols-subgrid gap-y-2"
                >
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
                            ? (`data:image/${img.lqip.split("data:image/")[1]}` as const)
                            : "empty"
                        }
                        className={cn("w-full", colSpan, colStart)}
                      />
                    );
                  })}
                </div>
              );
            } else if (section._type === "textBlock") {
              const isLastTextBlock = sectionIndex === lastTextBlockIndex;
              return (
                <div
                  key={key}
                  className={cn(
                    textClasses.portableText,
                    "col-span-full lg:col-span-2 lg:col-start-3",
                  )}
                >
                  <PortableText
                    value={section.content || []}
                    components={components}
                  />
                  {isLastTextBlock && (
                    <Link
                      href="mailto:mail@studiomonaghan.com"
                      className="mt-8"
                    >
                      → Get in touch about a project
                    </Link>
                  )}
                </div>
              );
            } else {
              return null;
            }
          })}
          {(previousProject || nextProject) && (
            <div className="col-span-full grid grid-cols-subgrid pt-8 lg:pt-20 gap-4">
              {previousProject && (
                <ProjectCard
                  title={`Previous Project: ${previousProject.title || ""}`}
                  className="col-span-2 justify-end lg:col-span-1"
                  project={previousProject}
                />
              )}
              {nextProject && (
                <ProjectCard
                  title={`Next Project: ${nextProject.title || ""}`}
                  className="col-span-2 justify-end lg:col-span-1 lg:col-start-4"
                  project={nextProject}
                />
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
