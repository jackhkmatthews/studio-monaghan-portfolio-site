import { urlFor } from "@/sanity/lib/image";
import { textClasses } from "@/styles/textClasses";
import { cn, getDimensions } from "@/lib/utils";
import Link from "next/link";
import { ClientImage } from "@/components/client-image";
import { getImageDimensions } from "@sanity/asset-utils";
import type { WORK_QUERYResult } from "@/sanity/types";
import { ComponentProps } from "react";
import { ctaClasses } from "@/styles/ctaClasses";

type ProjectRow = NonNullable<
  NonNullable<WORK_QUERYResult>["projectRows"]
>[number];
type Project = NonNullable<ProjectRow["projects"]>[number];

function ProjectCard({
  project,
  className,
  ...props
}: ComponentProps<"article"> & { project: Project }) {
  const dims = getImageDimensions(project.coverImage?.asset?._ref || "");
  const { width, height } = getDimensions(1.2, dims.width, dims.height);
  const url = urlFor(project.coverImage || {})
    .height(height)
    .width(width)
    .auto("format")
    .url();

  return (
    <article
      className={cn(
        "flex flex-col gap-0 items-start relative h-full bg-white",
        className,
      )}
      {...props}
    >
      {project.coverImage && (
        <ClientImage
          className="w-full h-auto min-h-full hover:opacity-90 transition-opacity"
          placeholder={
            project.coverImage.lqip
              ? `data:image/${project.coverImage.lqip.split("data:image/")[1]}`
              : "empty"
          }
          src={url}
          sizes="(max-width: 768px) 100vw, 50vw"
          alt={project.coverImage.alt || ""}
          width={width}
          height={height}
        />
      )}
      <Link
        href={`/work/${project.slug?.current}`}
        className={cn(
          textClasses.body,
          "text-white absolute inset-0 flex items-end p-2 bg-transparent hover:bg-white/5 transition-colors",
        )}
      >
        {project.title}
      </Link>
    </article>
  );
}

export function TwoProjectRow({ projects }: { projects: Project[] }) {
  return (
    <div className="col-span-full grid-cols-subgrid grid gap-[inherit]">
      {projects.map((project) => (
        <ProjectCard
          project={project}
          key={project._id}
          className="sm:col-span-3"
        />
      ))}
    </div>
  );
}

export function ThreeProjectRow({
  projects,
  layout = "equal",
}: {
  projects: Project[];
  layout?: ProjectRow["layout"];
}) {
  const actualLayout = layout || "equal";

  return (
    <div className={cn("grid grid-cols-subgrid col-span-full gap-[inherit]")}>
      <ProjectCard
        project={projects[0]}
        className={cn(
          actualLayout === "left"
            ? "sm:col-span-4"
            : actualLayout === "right"
              ? "sm:col-span-4"
              : "sm:col-span-3",
        )}
      />
      <div
        className={cn(
          "flex flex-col gap-2",
          actualLayout === "left"
            ? "sm:col-span-2"
            : actualLayout === "right"
              ? "sm:col-span-2"
              : "sm:col-span-3",
        )}
      >
        <ProjectCard project={projects[1]} />
        <ProjectCard project={projects[2]} />
      </div>
    </div>
  );
}
