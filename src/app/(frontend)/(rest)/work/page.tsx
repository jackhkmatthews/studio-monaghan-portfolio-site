import { sanityFetch } from "@/sanity/lib/live";
import { WORK_QUERY as WORK_QUERY } from "@/sanity/queries";
import { ThreeProjectRow, TwoProjectRow } from "@/components/project-rows";
import { Fragment } from "react";

export default async function WorkPage() {
  const { data: workData } = await sanityFetch({ query: WORK_QUERY });
  const projectRows = workData?.projectRows || [];

  return (
    <main className="grid grid-cols-1 sm:grid-cols-6 gap-1 flex-1 px-1 pb-8 lg:pb-10">
      {projectRows.map((row, index: number) => {
        const { projects, layout } = row;

        if (!projects || projects.length === 0) return null;

        return (
          <Fragment key={`row-${index}`}>
            {projects.length === 2 ? (
              <TwoProjectRow projects={projects} />
            ) : projects.length === 3 ? (
              <ThreeProjectRow projects={projects} layout={layout} />
            ) : null}
          </Fragment>
        );
      })}
    </main>
  );
}
