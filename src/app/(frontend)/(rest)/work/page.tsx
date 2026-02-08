import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { textClasses } from "@/styles/textClasses";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ClientImage } from "@/components/client-image";
import { getImageDimensions } from "@sanity/asset-utils";

function getDimensions(aspectRatio: number, maxWidth: number, maxHeight: number) {
  // Try fitting to max width first
  let width = maxWidth;
  let height = Math.floor(maxWidth / aspectRatio);

  // If height exceeds max, scale down to fit max height
  if (height > maxHeight) {
    height = maxHeight;
    width = Math.floor(maxHeight * aspectRatio);
  }

  return { width, height };
}

export default async function WorkPage() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <main className="flex flex-col gap-6 flex-1 px-4 pb-8 lg:pb-10 lg:px-8">
      {projects && projects.length > 0 && (
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const dims = getImageDimensions(
              project.coverImage?.asset?._ref || "",
            );
            const { width, height } = getDimensions(1.2, dims.width, dims.height);
            const url = urlFor(project.coverImage || {})
              .height(height)
              .width(width)
              .auto("format")
              .url()

            return (
              <li key={project._id + index.toString()}>
                <article
                  key={project._id}
                  className="flex flex-col gap-2 items-start relative"
                >
                  {project.coverImage && (
                    <ClientImage
                      className="w-full h-auto"
                      placeholder={
                        project.coverImage.lqip
                          ? `data:image/${project.coverImage.lqip.split("data:image/")[1]}`
                          : "empty"
                      }
                      src={url}
                      sizes="(width < 768px) 100vw, (width < 1024px) 50vw, (width >= 1024px) 33.33vw"
                      alt={project.coverImage.alt || ""}
                      width={width}
                      height={height}
                    />
                  )}
                  <Link
                    href={`/work/${project.slug?.current}`}
                    className={cn(
                      textClasses.body,
                      "underline-offset-4 hover:underline",
                    )}
                  >
                    {project.title}
                    <span className="absolute inset-0 block" />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
