import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Reveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start a Project with Alph@ Media" },
      {
        name: "description",
        content:
          "Send your brief: identity, packaging, campaign or motion. Tell us the scope and budget and we'll reply within two working days.",
      },
      { property: "og:title", content: "Contact — Start a Project with Alph@ Media" },
      {
        property: "og:description",
        content: "Share your brief and budget — we reply within two working days.",
      },
    ],
  }),
  component: ContactPage,
});

const services = ["Brand identity", "Logo / mark", "Packaging", "Print & editorial", "Motion", "Other"];
const budgets = ["Under $2k", "$2k – $6k", "$6k – $15k", "$15k+"];

const inputClass =
  "w-full border-2 border-foreground bg-background px-4 py-3 text-base outline-none placeholder:text-muted-foreground focus:border-primary";
const labelClass = "block text-xs font-semibold uppercase tracking-[0.2em]";

type Errors = Partial<Record<"name" | "email" | "service" | "budget" | "message", string>>;

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) next.email = "A valid email, please.";
    if (!form.service) next.service = "Pick a service.";
    if (!form.budget) next.budget = "Pick a budget range.";
    if (form.message.trim().length < 20) next.message = "A few more details — 20 characters minimum.";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Check the highlighted fields.");
      return;
    }
    setSent(true);
    toast.success("Brief received — we'll reply within two working days.");
  };

  return (
    <div>
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Contact
          </p>
          <h1 className="mt-4 font-display text-6xl leading-[0.88] md:text-[8rem]">
            Send the <span className="italic text-primary">brief</span>
          </h1>
        </Reveal>
      </section>

      <section className="border-y-2 border-foreground">
        <div className="mx-auto grid max-w-[1600px] gap-px bg-foreground md:grid-cols-[1.3fr_0.7fr]">
          <div className="bg-background p-5 md:p-10">
            {sent ? (
              <div className="border-2 border-foreground p-8">
                <h2 className="font-display text-4xl leading-none md:text-6xl">
                  Thanks, {form.name.split(" ")[0]}.
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed">
                  Your brief is in. Expect a reply within two working days with next steps, a
                  proposed scope and available start dates.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", service: "", budget: "", message: "" });
                  }}
                  className="mt-8 border-b-2 border-foreground pb-1 text-xs font-semibold uppercase tracking-[0.2em] hover:border-primary hover:text-primary"
                >
                  Send another brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      className={cn(inputClass, "mt-3", errors.name && "border-destructive")}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Ada Obi"
                    />
                    {errors.name && (
                      <p className="mt-2 text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={cn(inputClass, "mt-3", errors.email && "border-destructive")}
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@studio.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <fieldset>
                  <legend className={labelClass}>Service</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set("service", s)}
                        className={cn(
                          "border-2 border-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
                          form.service === s
                            ? "bg-foreground text-background"
                            : "hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.service && (
                    <p className="mt-2 text-xs text-destructive">{errors.service}</p>
                  )}
                </fieldset>

                <fieldset>
                  <legend className={labelClass}>Budget</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => set("budget", b)}
                        className={cn(
                          "border-2 border-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
                          form.budget === b
                            ? "bg-foreground text-background"
                            : "hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {errors.budget && (
                    <p className="mt-2 text-xs text-destructive">{errors.budget}</p>
                  )}
                </fieldset>

                <div>
                  <label className={labelClass} htmlFor="message">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className={cn(inputClass, "mt-3 resize-y", errors.message && "border-destructive")}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="What are you building, who is it for, and when does it need to land?"
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                <Magnetic type="submit">Send brief</Magnetic>
              </form>
            )}
          </div>

          <aside className="space-y-10 bg-background p-5 md:p-10">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Direct
              </h2>
              <a
                href="mailto:studio@alphamedia.design"
                className="mt-3 block font-display text-3xl leading-none hover:text-primary"
              >
                studio@alphamedia.design
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Replies within two working days, Mon–Fri.
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Studio
              </h2>
              <p className="mt-3 text-lg leading-relaxed">
                Lagos, Nigeria — working with clients across 18 countries, remote-first.
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Elsewhere
              </h2>
              <ul className="mt-3 space-y-2 text-lg">
                {[
                  { label: "Instagram", href: "https://instagram.com" },
                  { label: "Behance", href: "https://behance.net" },
                  { label: "Dribbble", href: "https://dribbble.com" },
                  { label: "LinkedIn", href: "https://linkedin.com" },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border-b-2 border-transparent hover:border-primary hover:text-primary"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-foreground bg-accent p-6 text-accent-foreground">
              <p className="font-display text-2xl leading-tight">
                Booking identity work from late next month.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
