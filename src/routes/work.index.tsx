import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { listPublishedProjects } from "@/lib/projects.functions";
import { WorkGrid } from "@/components/site/work-grid";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/")({
  loader: () => listPublishedProjects(),
  errorComponent: () => (
    <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
      <h1 className="font-display text-5xl">Couldn't load the portfolio.</h1>
      <p className="mt-4 text-muted-foreground">Please refresh the page.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
      <h1 className="font-display text-5xl">Page not found</h1>
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Work — Alph@ Media Portfolio" },
      {
        name: "description",
        content:
          "Selected branding, logo, poster, packaging, social, motion and illustration projects by Alph@ Media.",
      },
      { property: "og:title", content: "Work — Alph@ Media Portfolio" },
      {
        property: "og:description",
        content: "Selected graphic design case studies across brand, print, packaging and motion.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const projects = Route.useLoaderData();
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects],
  );

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Portfolio — {projects.length} projects
        </p>
        <h1 className="mt-4 font-display text-6xl leading-[0.9] md:text-[8rem]">
          Selected <span className="italic text-primary">work</span>
        </h1>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-2 border-y-2 border-foreground py-5">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "border-2 border-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
              filter === c
                ? "bg-foreground text-background"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10">
        {filtered.length ? (
          <WorkGrid items={filtered} />
        ) : (
          <p className="py-20 text-center font-display text-3xl text-muted-foreground">
            Nothing here yet — new {filter.toLowerCase()} work is in production.
          </p>
        )}
      </motion.div>
    </div>
  );
}
