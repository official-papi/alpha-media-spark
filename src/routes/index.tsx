import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { listPublishedProjects } from "@/lib/projects.functions";
import { WorkGrid } from "@/components/site/work-grid";
import { Marquee } from "@/components/site/marquee";
import { Reveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";

export const Route = createFileRoute("/")({
  loader: () => listPublishedProjects(),
  errorComponent: () => (
    <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
      <h1 className="font-display text-5xl">Something broke loading the work.</h1>
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
      { title: "Alph@ Media — Graphic Design Studio" },
      {
        name: "description",
        content:
          "Independent graphic design studio building loud brand identities, packaging, posters and motion for ambitious clients.",
      },
      { property: "og:title", content: "Alph@ Media — Graphic Design Studio" },
      {
        property: "og:description",
        content:
          "Independent graphic design studio building loud brand identities, packaging, posters and motion for ambitious clients.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "4+ yrs", label: "Professional experience" },
  { value: "UI", label: "Design & web development" },
  { value: "Print", label: "Graphics & brand kits" },
  { value: "Events", label: "Media coverage" },
];


function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: (e.clientX - (rect.left + rect.width / 2)) / rect.width,
          y: (e.clientY - (rect.top + rect.height / 2)) / rect.height,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative overflow-hidden border-b-2 border-foreground"
    >
      <motion.div
        style={{ y, opacity }}
        className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28"
      >
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Graphic design studio — Lagos / remote
          </p>
        </Reveal>

        <motion.h1
          animate={{ x: tilt.x * 24, y: tilt.y * 14 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="mt-6 font-display text-[19vw] leading-[0.82] tracking-tight md:text-[13vw]"
        >
          Alph<span className="text-primary">@</span>
          <br />
          <span className="italic">Media</span>
        </motion.h1>

        <div className="mt-10 grid gap-8 border-t-2 border-foreground pt-8 md:grid-cols-[1.2fr_1fr]">
          <Reveal delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed md:text-xl">
              I'm Alexx — a web designer and visual creative with 4+ years turning ideas into
              engaging digital and visual experiences: UI design, web development, graphics and
              event media coverage.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-wrap items-start gap-3 md:justify-end">
            <Magnetic to="/work">See the work</Magnetic>
            <Magnetic to="/contact" variant="outline">
              Start a project
            </Magnetic>
          </Reveal>
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-10 hidden size-72 rounded-full bg-accent mix-blend-multiply blur-2xl md:block"
      />
    </section>
  );
}

function Home() {
  const projects = Route.useLoaderData();
  const featured = projects.slice(0, 6);

  return (
    <div>
      <Hero />

      <Marquee
        items={["Brand identity", "Packaging", "Posters", "Motion", "Editorial", "Illustration"]}
        className="border-t-0"
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-foreground pb-6">
          <Reveal>
            <h2 className="font-display text-5xl leading-none md:text-7xl">
              Featured <span className="italic text-primary">work</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] hover:text-primary"
            >
              All {projects.length} projects
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10">
          <WorkGrid items={featured} />
        </div>
      </section>

      <section className="border-y-2 border-foreground bg-foreground text-background">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-10 px-5 py-14 md:grid-cols-4 md:px-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="font-display text-5xl leading-none md:text-7xl">{s.value}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
              One creative, <span className="italic text-primary">many</span> surfaces.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed">
            <p>
              Canva, Photoshop, Lightroom and CorelDRAW for the visuals; Figma and code for the
              interfaces. Same eye for detail whether it lands on a screen, a banner or a feed.
            </p>
            <p className="text-muted-foreground">
              I work with brands, businesses and individuals — from full websites and UI systems to
              social creatives and event media coverage.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-xs font-semibold uppercase tracking-[0.2em] hover:border-primary hover:text-primary"
            >
              How we work <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>


      <section className="border-t-2 border-foreground bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-10">
          <h2 className="font-display text-5xl leading-[0.9] md:text-8xl">
            Got something
            <br />
            worth building?
          </h2>
          <Magnetic to="/contact">Let's talk</Magnetic>
        </div>
      </section>
    </div>
  );
}
