import { Link } from "@tanstack/react-router";
import { Marquee } from "./marquee";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-foreground">
      <Marquee
        items={["Let's make something loud", "Available for freelance"]}
        className="border-t-0 bg-accent text-accent-foreground"
        reverse
      />
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-4xl leading-none">
            Alph<span className="text-primary">@</span> Media
          </p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Independent graphic design studio. Brand identity, print, packaging and motion for
            people who refuse to blend in.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Pages
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/work", label: "Work" },
              { to: "/services", label: "Services" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Elsewhere
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="mailto:studio@alphamedia.design" className="hover:text-primary">
                studio@alphamedia.design
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="hover:text-primary">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://behance.net" className="hover:text-primary">
                Behance
              </a>
            </li>
            <li>
              <a href="https://dribbble.com" className="hover:text-primary">
                Dribbble
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-foreground px-5 py-5 text-xs uppercase tracking-[0.18em] md:px-10">
        © {new Date().getFullYear()} Alph@ Media — Designed in the open
      </div>
    </footer>
  );
}
