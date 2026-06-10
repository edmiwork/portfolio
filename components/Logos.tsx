"use client";

import { SwipeMarquee } from "@/components/ui/swipe-marquee";

// Replace these with real client logos: drop SVG/PNG files in /public/logos/
// and swap the <span> wordmarks for <img src="/logos/foo.svg" .../>.
const brands = [
  "Healthcare",
  "Ophthalmology",
  "Dentistry",
  "Food & Beverage",
  "Agriculture",
  "Organic Products",
  "Content Creation",
  "Personal Branding",
  "Marketing",
  "Advertising",
  "Entertainment",
  "Animation",
  "Consumer Goods",
];

export function Logos() {
  const row = [...brands, ...brands];
  return (
    <section className="border-y border-[var(--border)] py-10" aria-label="Industries and clients">
      <p className="mb-8 text-center text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
        Trusted across industries
      </p>
      {/* Desktop: CSS marquee (pauses on hover) */}
      <div className="marquee-wrap relative hidden overflow-hidden md:block">
        <div className="marquee flex w-max items-center gap-12 pr-12">
          {row.map((b, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-xl text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text)] sm:text-2xl"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile: swipeable auto-scrolling marquee */}
      <SwipeMarquee className="items-center px-5 md:hidden" gapClassName="gap-10">
        {brands.map((b, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-xl text-[var(--muted)]"
          >
            {b}
          </span>
        ))}
      </SwipeMarquee>
    </section>
  );
}
