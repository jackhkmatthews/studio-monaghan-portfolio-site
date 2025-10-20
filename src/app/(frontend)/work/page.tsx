import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { textClasses } from "@/styles/textClasses";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default async function WorkPage() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <main className="flex flex-col gap-6 flex-1 px-2 py-2 lg:px-4">
      <h1 className={cn(textClasses.h2)}>Selected Projects</h1>

      {projects && projects.length > 0 && (
        <ul className="grid gap-8">
          {projects.map((project) => (
            <li key={project._id}>
              <article
                key={project._id}
                className="flex flex-col gap-2 items-start relative"
              >
                {project.coverImage && (
                  <Image
                    src={urlFor(project.coverImage)
                      .width(400)
                      .height(400)
                      .quality(80)
                      .auto("format")
                      .url()}
                    alt={project.coverImage.alt || ""}
                    width={400}
                    height={400}
                  />
                )}
                <Link
                  href={`/work/${project.slug?.current}`}
                  className={cn(
                    textClasses.body,
                    "underline-offset-4 hover:underline"
                  )}
                >
                  {project.title}
                  <span className="absolute inset-0 block" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
