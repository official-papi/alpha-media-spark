import { cn } from "@/lib/utils";

const faces = [
  { label: "A", t: "translateZ(var(--cube-half))" },
  { label: "L", t: "rotateY(180deg) translateZ(var(--cube-half))" },
  { label: "P", t: "rotateY(90deg) translateZ(var(--cube-half))" },
  { label: "H", t: "rotateY(-90deg) translateZ(var(--cube-half))" },
  { label: "@", t: "rotateX(90deg) translateZ(var(--cube-half))" },
  { label: "M", t: "rotateX(-90deg) translateZ(var(--cube-half))" },
];

/** Pure-CSS 3D rotating wireframe cube — brutalist accent object. */
export function Cube({ className, size = 200 }: { className?: string; size?: number }) {
  return (
    <div
      aria-hidden
      className={cn("[perspective:900px]", className)}
      style={
        {
          width: size,
          height: size,
          ["--cube-half" as string]: `${size / 2}px`,
        } as React.CSSProperties
      }
    >
      <div className="cube-spin relative size-full [transform-style:preserve-3d]">
        {faces.map((f) => (
          <div
            key={f.label}
            className="absolute inset-0 flex items-center justify-center border-2 border-foreground bg-background/70 font-display text-6xl text-primary"
            style={{ transform: f.t }}
          >
            {f.label}
          </div>
        ))}
      </div>
    </div>
  );
}
