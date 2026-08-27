import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectRecord } from "@/lib/project-types";

export function WorkGrid({ items }: { items: ProjectRecord[] }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
      {items.map((p, i) => (
        <ProjectTile key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}

function ProjectTile({ project, index }: { project: ProjectRecord; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="break-inside-avoid"
    >
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="group block border-2 border-foreground bg-background"
      >
        <div className="relative overflow-hidden">
          <img
            src={project.cover}
            alt={`${project.title} — ${project.category} project by Alph@ Media`}
            width={project.width}
            height={project.height}
            loading="lazy"
            className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-primary opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-70" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-400 ease-out group-hover:translate-y-0">
            <p className="font-display text-3xl text-primary-foreground">{project.title}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/90">
              {project.client}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 border-t-2 border-foreground p-4">
          <div>
            <p className="font-display text-2xl leading-none">{project.title}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {project.category} · {project.year}
            </p>
          </div>
          <ArrowUpRight className="size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </Link>
    </motion.div>
  );
}
