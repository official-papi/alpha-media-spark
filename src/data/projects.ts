import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import work7 from "@/assets/work-7.jpg";
import work8 from "@/assets/work-8.jpg";

export const categories = [
  "Branding",
  "Logos",
  "Posters",
  "Packaging",
  "Social",
  "Motion",
  "Illustration",
  "Editorial",
] as const;

export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: Category;
  blurb: string;
  brief: string;
  role: string[];
  deliverables: string[];
  results: { label: string; value: string }[];
  cover: string;
  width: number;
  height: number;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "cede-coffee",
    title: "Cede Coffee",
    client: "Cede Roasters, Lagos",
    year: "2026",
    category: "Branding",
    blurb: "A loud, letterform-first identity for a slow-roast coffee house.",
    brief:
      "Cede wanted to sell specialty coffee without the beige minimalism everyone else was using. We built the identity on a single oversized wordmark that gets cropped, stacked and repeated until it becomes pattern.",
    role: ["Brand strategy", "Identity design", "Packaging", "Art direction"],
    deliverables: ["Wordmark & marks", "Packaging system", "Poster series", "Store signage"],
    results: [
      { label: "Retail lift", value: "+38%" },
      { label: "SKUs shipped", value: "12" },
      { label: "Weeks", value: "9" },
    ],
    cover: work1,
    width: 900,
    height: 1200,
    gallery: [work1, work4, work3],
  },
  {
    slug: "octa-marks",
    title: "Octa Mark System",
    client: "Octa Logistics",
    year: "2025",
    category: "Logos",
    blurb: "Eight interlocking marks built from one geometric grid.",
    brief:
      "A logistics group with eight sub-brands needed marks that read as family without repeating a single shape. We drew every mark on the same 8-unit grid so they lock together in motion.",
    role: ["Mark design", "Grid system", "Brand guidelines"],
    deliverables: ["8 sub-brand marks", "Construction grid", "Usage manual"],
    results: [
      { label: "Sub-brands", value: "8" },
      { label: "Grid units", value: "8×8" },
      { label: "Pages of guide", value: "64" },
    ],
    cover: work2,
    width: 1200,
    height: 900,
    gallery: [work2, work7, work5],
  },
  {
    slug: "musica-festival",
    title: "Musica Festival",
    client: "Musica Live",
    year: "2025",
    category: "Posters",
    blurb: "A halftone poster campaign wheatpasted across three cities.",
    brief:
      "Three-day festival, forty acts, one poster language. Type does all the work: black slab headlines, halftone bleed, and a yellow that survives being pasted on a wet wall.",
    role: ["Campaign art direction", "Poster design", "Print production"],
    deliverables: ["24 posters", "Billboard adaptations", "Ticket & pass design"],
    results: [
      { label: "Posters printed", value: "4.2k" },
      { label: "Cities", value: "3" },
      { label: "Sold out in", value: "6 days" },
    ],
    cover: work3,
    width: 900,
    height: 1200,
    gallery: [work3, work1, work6],
  },
  {
    slug: "polis-skincare",
    title: "Polis Skincare",
    client: "Polis Labs",
    year: "2026",
    category: "Packaging",
    blurb: "Matte black boxes, one orange sticker, zero decoration.",
    brief:
      "The whole system is a black box and a printed label. Cost per unit dropped, shelf presence went up, and the range can grow forever by changing one sticker.",
    role: ["Packaging design", "Label system", "Photography direction"],
    deliverables: ["Primary & secondary packaging", "Label templates", "Launch imagery"],
    results: [
      { label: "Unit cost", value: "-22%" },
      { label: "Launch SKUs", value: "9" },
      { label: "Sell-through", value: "94%" },
    ],
    cover: work4,
    width: 1000,
    height: 1000,
    gallery: [work4, work2, work8],
  },
  {
    slug: "bours-zine",
    title: "Bours Zine",
    client: "Bours Editorial",
    year: "2024",
    category: "Editorial",
    blurb: "A quarterly print zine with a hard grid and softer serif voice.",
    brief:
      "Twelve-column grid, two typefaces, no stock photography. Each issue reorganises the same components so the zine feels new without losing its spine.",
    role: ["Editorial design", "Typesetting", "Cover art direction"],
    deliverables: ["Master grid", "4 issues", "Cover series"],
    results: [
      { label: "Issues", value: "4" },
      { label: "Pages set", value: "412" },
      { label: "Subscribers", value: "7.8k" },
    ],
    cover: work5,
    width: 1200,
    height: 800,
    gallery: [work5, work8, work1],
  },
  {
    slug: "lumen-social",
    title: "Lumen Social Kit",
    client: "Lumen App",
    year: "2026",
    category: "Social",
    blurb: "A 60-template social system a two-person team can run alone.",
    brief:
      "Lumen posts daily and has no designer on staff. We shipped a template kit with locked type scales and three colourways so anyone can post on-brand in five minutes.",
    role: ["Design system", "Template design", "Team training"],
    deliverables: ["60 templates", "Motion presets", "Playbook"],
    results: [
      { label: "Templates", value: "60" },
      { label: "Engagement", value: "+61%" },
      { label: "Time per post", value: "5 min" },
    ],
    cover: work6,
    width: 900,
    height: 1100,
    gallery: [work6, work7, work2],
  },
  {
    slug: "chrome-motion",
    title: "Chrome Motion",
    client: "Axis Studio",
    year: "2025",
    category: "Motion",
    blurb: "A 3D title sequence built from chrome and burnt orange.",
    brief:
      "Fifteen seconds of hard-edged geometry for a studio reel opener. Everything is one material system: polished chrome, flat orange, black void.",
    role: ["Concept", "3D design", "Animation"],
    deliverables: ["Title sequence", "Stinger set", "Reel stills"],
    results: [
      { label: "Runtime", value: "15s" },
      { label: "Frames", value: "900" },
      { label: "Awards", value: "2" },
    ],
    cover: work7,
    width: 1000,
    height: 1000,
    gallery: [work7, work2, work4],
  },
  {
    slug: "figures-illustration",
    title: "Figures",
    client: "Self-initiated",
    year: "2024",
    category: "Illustration",
    blurb: "A printed illustration study of bodies in flat colour.",
    brief:
      "A personal series exploring how few marks a figure needs to still read as a person. Printed as a riso-style zine and sold out twice.",
    role: ["Illustration", "Print design", "Self-publishing"],
    deliverables: ["32 illustrations", "Zine", "Print set"],
    results: [
      { label: "Illustrations", value: "32" },
      { label: "Print runs", value: "2" },
      { label: "Copies", value: "600" },
    ],
    cover: work8,
    width: 1100,
    height: 850,
    gallery: [work8, work5, work3],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
