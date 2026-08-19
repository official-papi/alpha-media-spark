import { useEffect, useRef, useState } from "react";

/** Custom cursor that grows and inverts over interactive elements. Desktop only. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let mx = rx;
    let my = ry;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, [data-cursor='hover'], input, textarea, select"));
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={dot}
        className="fixed left-0 top-0 size-2 bg-primary transition-[opacity] duration-200"
        style={{ opacity: active ? 0 : 1 }}
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 border-2 border-foreground transition-[width,height,background-color] duration-200 ease-out"
        style={{
          width: active ? 56 : 26,
          height: active ? 56 : 26,
          backgroundColor: active ? "var(--color-primary)" : "transparent",
          borderColor: active ? "var(--color-primary)" : "var(--color-foreground)",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
