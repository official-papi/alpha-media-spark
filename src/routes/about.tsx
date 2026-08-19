import { createFileRoute } from "@tanstack/react-router";
import work2 from "@/assets/work-2.jpg";
import { Reveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";
import { Marquee } from "@/components/site/marquee";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Studio — Alph@ Media" },
      {
        name: "description",
        content:
          "Alph@ Media is an independent graphic design studio: nine years of identity, packaging and motion work for coffee roasters, labels, fintechs and festivals.",
      },
      { property: "og:title", content: "About the Studio — Alph@ Media" },
      {
        property: "og:description",
        content: "Nine years of identity, packaging and motion design — the toolkit and the timeline.",
      },
    ],
  }),
  component: AboutPage,
});

const toolkit = [
  { group: "Adobe", items: ["Illustrator", "Photoshop", "InDesign", "After Effects"] },
  { group: "Product", items: ["Figma", "Framer", "Webflow"] },
  { group: "3D & motion", items: ["Blender", "Cinema 4D", "Rive"] },
  { group: "Print", items: ["Prepress specs", "Dielines", "Pantone matching"] },
];

const timeline = [
  { year: "2017", title: "First freelance mark", body: "Designed a record-label logo between university deadlines. Never stopped." },
  { year: "2019", title: "In-house at an agency", body: "Two years of packaging and retail work at scale, plus a taste for tight print specs." },
  { year: "2021", title: "Alph@ Media opens", body: "Independent studio, working direct with founders instead of through three layers of account management." },
  { year: "2023", title: "First award", body: "A coffee identity picked up a regional design award and a lot of very good coffee." },
  { year: "2026", title: "Today", body: "Selective roster, 6–8 identity projects a year, plus campaign and motion work." },
];

const clients = [
  "Cede Roasters",
  "Nova Records",
  "Palma Fintech",
  "Harmattan Festival",
  "Ode Studio",
  "Third Coast Press",
  "Lumen Optics",
  "Ravel Textiles",
];

const principles = [
  { title: "Loud, not messy", body: "Contrast and scale do the shouting. The grid keeps it legible." },
  { title: "Systems over one-offs", body: "If it only works on the pitch deck, it isn't a brand." },
  { title: "Print discipline", body: "Files that survive a real press, a real embroiderer, a real screen." },
];

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              About the studio
            </p>
            <h1 className="mt-4 font-display text-6xl leading-[0.88] md:text-[7rem]">
              Design that <span className="italic text-primary">holds up</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed">
              I'm the designer behind Alph@ Media — nine years of building identities, packaging
              and campaigns for people who would rather be memorable than safe. Small studio, direct
              line, no handoffs to a junior after the pitch.
            </p>
            <div className="mt-8">
              <Magnetic to="/work">See the portfolio</Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="border-2 border-foreground">
              <img
                src={work2}
                alt="Studio work: layered poster and packaging artwork in orange and black"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={["Identity", "Packaging", "Motion", "Editorial", "Illustration"]} />

      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
        <Reveal>
          <h2 className="font-display text-5xl leading-none md:text-7xl">Principles</h2>
        </Reveal>
        <div className="mt-10 grid gap-px border-2 border-foreground bg-foreground md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="bg-background p-7">
              <h3 className="font-display text-3xl leading-none">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-foreground">
        <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
          <Reveal>
            <h2 className="font-display text-5xl leading-none md:text-7xl">Toolkit</h2>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-4">
            {toolkit.map((t, i) => (
              <Reveal key={t.group} delay={i * 0.06}>
                <h3 className="border-b-2 border-foreground pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {t.group}
                </h3>
                <ul className="mt-4 space-y-2 text-lg">
                  {t.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
        <Reveal>
          <h2 className="font-display text-5xl leading-none md:text-7xl">
            The <span className="italic text-primary">timeline</span>
          </h2>
        </Reveal>
        <ol className="mt-10">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05}>
              <li className="grid gap-4 border-t-2 border-foreground py-8 md:grid-cols-[140px_1fr_1.4fr]">
                <span className="font-display text-4xl text-primary">{t.year}</span>
                <h3 className="font-display text-3xl leading-none">{t.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{t.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-y-2 border-foreground bg-foreground text-background">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] opacity-70">
            Selected clients
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {clients.map((c) => (
              <p key={c} className="font-display text-3xl leading-none md:text-4xl">
                {c}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-10">
          <h2 className="font-display text-5xl leading-[0.9] md:text-7xl">
            Let's make something loud.
          </h2>
          <Magnetic to="/contact">Start a project</Magnetic>
        </div>
      </section>
    </div>
  );
}
