import { useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  type?: "button" | "submit";
};

/** Button/link that leans toward the cursor. */
export function Magnetic({
  to,
  href,
  onClick,
  children,
  className,
  variant = "solid",
  type = "button",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.28,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.35,
    });
  };

  const classes = cn(
    "inline-flex items-center justify-center border-2 border-foreground px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em]",
    variant === "solid"
      ? "bg-foreground text-background hover:bg-primary hover:border-primary hover:text-primary-foreground"
      : "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
    "transition-colors duration-200",
    className,
  );

  const inner = to ? (
    <Link to={to as never} className={classes}>
      {children}
    </Link>
  ) : href ? (
    <a href={href} className={classes}>
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
    >
      {inner}
    </motion.span>
  );
}
