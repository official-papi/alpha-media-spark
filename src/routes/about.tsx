import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/alexx-portrait.png.asset.json";
import { Reveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";
import { Marquee } from "@/components/site/marquee";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Alexx — Web Designer & Visual Creative" },
      {
        name: "description",
        content:
          "Alexx is a web designer and visual creative with 4+ years of experience in UI design, web development, graphic design and event media coverage.",
      },
      { property: "og:title", content: "About Alexx — Web Designer & Visual Creative" },
      {
        property: "og:description",
        content:
          "4+ years turning ideas into engaging visual experiences — UI design, web development, graphic design and event media coverage.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const toolkit = [
  { group: "Design", items: ["Adobe Photoshop", "CorelDRAW", "Canva", "Figma"] },
  { group: "Photo", items: ["Adobe Lightroom", "Colour grading", "Retouching"] },
  { group: "Web", items: ["UI design", "Responsive layout", "Web development"] },
  { group: "Media", items: ["Event coverage", "Social creatives", "Brand kits"] },
];

const timeline = [
  { year: "2022", title: "First paid designs", body: "Started with flyers and social creatives for small businesses — and never put the tools down." },
  { year: "2023", title: "Into UI design", body: "Moved from static graphics into interfaces: landing pages, dashboards, mobile screens." },
  { year: "2024", title: "Web development", body: "Started shipping the designs myself, so the final site looks like the mockup." },
  { year: "2025", title: "Event media coverage", body: "Photo and visual coverage for events, with same-week edits and social cutdowns." },
  { year: "2026", title: "Today", body: "Working with brands, businesses and individuals across design, web and media." },
];

const services = [
  "Web design",
  "UI design",
  "Web development",
  "Graphic design",
  "Brand identity",
  "Social media creatives",
  "Photo editing",
  "Event media coverage",
];

const principles = [
  { title: "Detail first", body: "Spacing, type and contrast decided on purpose — not by accident." },
  { title: "Visual storytelling", body: "Every layout should say something before anyone reads a word." },
  { title: "Design that ships", body: "Files and builds that work in the real world, online and in print." },
];


function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              About me
            </p>
            <h1 className="mt-4 font-display text-6xl leading-[0.88] md:text-[7rem]">
              I'm <span className="italic text-primary">Alexx</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed">
              A passionate web designer and visual creative with over four years of professional
              experience creating compelling digital and visual experiences. I work in Canva, Adobe
              Photoshop, Lightroom and CorelDRAW, with a strong eye for creativity, detail and
              visual storytelling.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Beyond graphic design, I specialise in UI design, web development and event media
              coverage — helping brands, businesses and individuals turn ideas into engaging visual
              experiences, online and offline.
            </p>
            <div className="mt-8">
              <Magnetic to="/work">See the portfolio</Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="border-2 border-foreground bg-foreground">
              <img
                src={portrait.url}
                alt="Alexx, web designer and visual creative, in a black and white studio portrait"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-[65%_30%]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={services} />


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
            What I do
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {services.map((c) => (
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
