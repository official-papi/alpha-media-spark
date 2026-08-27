import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { listPublishedProjects } from "@/lib/projects.functions";
import { Reveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }) => {
    const all = await listPublishedProjects();
    const i = all.findIndex((p) => p.slug === params.slug);
    if (i === -1) throw notFound();
    return { project: all[i]!, next: all[(i + 1) % all.length], total: all.length };
  },
  errorComponent: () => (
    <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
      <h1 className="font-display text-5xl">Couldn't load this case study.</h1>
      <p className="mt-4 text-muted-foreground">Please refresh the page.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
      <h1 className="font-display text-5xl">Project not found</h1>
    </div>
  ),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — Alph@ Media" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.title} — Alph@ Media Case Study`;
    return {
      meta: [
        { title },
        { name: "description", content: project.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: project.blurb },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project, next } = Route.useLoaderData();

  return (
    <article>
      <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] hover:text-primary"
        >
          <ArrowLeft className="size-4" /> All work
        </Link>

        <Reveal className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-4 font-display text-6xl leading-[0.9] md:text-[7.5rem]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{project.blurb}</p>
        </Reveal>
      </div>

      <div className="border-y-2 border-foreground">
        <img
          src={project.cover}
          alt={`${project.title} cover artwork`}
          width={project.width}
          height={project.height}
          className="max-h-[80vh] w-full object-cover"
        />
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:px-10">
        <Reveal>
          <h2 className="font-display text-4xl">The brief</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{project.brief}</p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Client</p>
            <p className="mt-2">{project.client}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Role</p>
            <ul className="mt-2 space-y-1">
              {project.role.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Deliverables
            </p>
            <ul className="mt-2 space-y-1">
              {project.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-0 border-2 border-foreground sm:grid-cols-3">
          {project.results.map((r) => (
            <div
              key={r.label}
              className="border-b-2 border-foreground p-8 last:border-b-0 sm:border-b-0 sm:border-r-2 sm:last:border-r-0"
            >
              <p className="font-display text-6xl text-primary">{r.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {r.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <h2 className="font-display text-4xl">Process & artefacts</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <Reveal key={`${src}-${i}`} delay={i * 0.06} className={i === 0 ? "md:col-span-2" : ""}>
              <img
                src={src}
                alt={`${project.title} process image ${i + 1}`}
                loading="lazy"
                className="w-full border-2 border-foreground object-cover"
              />
            </Reveal>
          ))}
        </div>
      </div>

      {next && (
        <div className="border-t-2 border-foreground bg-foreground text-background">
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 px-5 py-16 md:px-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                Next project
              </p>
              <p className="mt-3 font-display text-5xl md:text-7xl">{next.title}</p>
            </div>
            <ArrowRight className="size-14 transition-transform duration-300 group-hover:translate-x-3" />
          </Link>
        </div>
      )}

      <div className="mx-auto max-w-[1600px] px-5 py-16 text-center md:px-10">
        <p className="font-display text-4xl">Got a project like this one?</p>
        <div className="mt-6">
          <Magnetic to="/contact">Start a project</Magnetic>
        </div>
        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {projects.length} case studies in the archive
        </p>
      </div>
    </article>
  );
}
