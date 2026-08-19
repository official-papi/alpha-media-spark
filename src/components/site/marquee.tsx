import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  reverse?: boolean;
  className?: string;
  separator?: string;
};

export function Marquee({ items, reverse, className, separator = "✳" }: Props) {
  const row = [...items, ...items];
  return (
    <div className={cn("overflow-hidden border-y-2 border-foreground py-4", className)}>
      <div className={cn("flex w-max", reverse ? "marquee-track-rev" : "marquee-track")}>
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-6 px-6 font-display text-3xl uppercase leading-none md:text-5xl"
          >
            {item}
            <span className="text-primary">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
