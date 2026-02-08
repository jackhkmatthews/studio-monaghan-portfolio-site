import { urlFor } from "@/sanity/lib/image";
import { textClasses } from "@/styles/textClasses";
import { cn, getDimensions } from "@/lib/utils";
import Link from "next/link";
import { ClientImage } from "@/components/client-image";
import { getImageDimensions } from "@sanity/asset-utils";
import type { WORK_QUERYResult } from "@/sanity/types";

type ProjectRow = NonNullable<
  NonNullable<WORK_QUERYResult>["projectRows"]
>[number];
type Project = NonNullable<ProjectRow["projects"]>[number];

function ProjectCard({ project }: { project: Project }) {
  const dims = getImageDimensions(project.coverImage?.asset?._ref || "");
  const { width, height } = getDimensions(1.2, dims.width, dims.height);
  const url = urlFor(project.coverImage || {})
    .height(height)
    .width(width)
    .auto("format")
    .url();

  return (
    <article className="flex flex-col gap-0 items-start relative h-full">
      {project.coverImage && (
        <ClientImage
          className="w-full h-auto"
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
          "underline-offset-4 hover:underline absolute bottom-0 left-0 bg-gray-brand pr-1 right-0 pb-2",
        )}
      >
        {project.title}
        <span className="absolute inset-0 block" />
      </Link>
    </article>
  );
}

export function TwoProjectRow({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-0">
      {projects.map((project) => (
        <div key={project._id}>
          <ProjectCard project={project} />
        </div>
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
  const layoutClasses = {
    equal: "md:grid-cols-2",
    left: "md:grid-cols-[2fr_1fr]",
    right: "md:grid-cols-[1fr_2fr]",
  };

  const actualLayout = layout || "equal";

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-2 gap-y-0",
        layoutClasses[actualLayout],
      )}
    >
      <ProjectCard project={projects[0]} />
      <div className="flex flex-col gap-2">
        <ProjectCard project={projects[1]} />
        <ProjectCard project={projects[2]} />
      </div>
    </div>
  );
}
