import type { ReactNode } from "react";

interface CakeCardProps {
  title: string;
  description: string;
  priceLabel: string;
  emoji?: string;
  badge?: string;
  children: ReactNode;
}

/** Cartão visual reutilizável do catálogo. Os controles vêm via children. */
export function CakeCard({
  title,
  description,
  priceLabel,
  emoji = "🍰",
  badge,
  children,
}: CakeCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white/70 shadow-card ring-1 ring-chocolate/5">
      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-rosa/30 to-creme text-5xl">
        <span role="img" aria-hidden>
          {emoji}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {badge && (
          <span className="mb-2 inline-flex w-fit rounded-full bg-rosa/25 px-3 py-0.5 text-xs font-semibold text-chocolate/80">
            {badge}
          </span>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 flex-1 text-sm text-chocolate/70">{description}</p>
        <p className="mt-3 font-display text-lg font-semibold text-chocolate">
          {priceLabel}
        </p>
        <div className="mt-4">{children}</div>
      </div>
    </article>
  );
}
