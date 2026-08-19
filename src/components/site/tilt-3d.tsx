import { useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Wraps children in a perspective container and tilts them in 3D toward the cursor. */
export function Tilt3D({
  children,
  className,
  max = 10,
  lift = 14,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  lift?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ rx: 0, ry: 0, px: 50, py: 50, on: false });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setRot({
      rx: (0.5 - ny) * max * 2,
      ry: (nx - 0.5) * max * 2,
      px: nx * 100,
      py: ny * 100,
      on: true,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setRot((r) => ({ ...r, rx: 0, ry: 0, on: false }))}
      className={cn("[perspective:1100px]", className)}
    >
      <motion.div
        className="relative [transform-style:preserve-3d] motion-reduce:!transform-none"
        animate={{
          rotateX: rot.rx,
          rotateY: rot.ry,
          z: rot.on ? lift : 0,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.5 }}
      >
        {children}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: rot.on ? 0.35 : 0,
              background: `radial-gradient(420px circle at ${rot.px}% ${rot.py}%, var(--color-accent), transparent 65%)`,
              mixBlendMode: "multiply",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
