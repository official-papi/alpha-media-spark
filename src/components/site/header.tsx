import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b-2 border-foreground bg-background transition-all duration-300",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="group flex items-baseline gap-2">
            <span
              className={cn(
                "font-display leading-none transition-all duration-300",
                scrolled ? "text-2xl" : "text-3xl md:text-4xl",
              )}
            >
              Alph<span className="text-primary">@</span> Media
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.slice(1).map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
                    active ? "text-primary" : "hover:text-primary",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 bottom-1 h-0.5 origin-left bg-primary transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="ml-3 border-2 border-foreground bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-primary hover:border-primary"
            >
              Start a project
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="border-2 border-foreground p-2 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        <motion.div
          style={{ scaleX: progress }}
          className="h-1 origin-left bg-primary"
          aria-hidden
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-[60px] z-40 flex flex-col justify-center bg-background px-6 md:hidden"
          >
            {nav.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <Link
                  to={item.to}
                  className="block border-b-2 border-foreground py-5 font-display text-5xl"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
