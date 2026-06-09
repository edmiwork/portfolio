"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { withBase } from "@/lib/site";

// Client logos live in /public/logo. Brands with both a light and dark artwork
// swap per theme; single-version brand marks render as-is on both themes.
type ClientLogo = {
  id: string;
  alt: string;
  /** Shown in light theme (dark/black or full-color artwork). */
  light: string;
  /** Shown in dark theme (white artwork). Omit for single-version logos. */
  dark?: string;
  className?: string;
};

const logos: ClientLogo[] = [
  {
    id: "alliance",
    alt: "Alliance",
    light: "/logo/alliance-color.svg",
    dark: "/logo/alliance-white.svg",
    className: "h-11 w-auto",
  },
  {
    id: "animart",
    alt: "Animart",
    light: "/logo/animart-black.svg",
    dark: "/logo/animart-white.svg",
    className: "h-11 w-auto",
  },
  {
    id: "kelloggs",
    alt: "Kellogg's",
    light: "/logo/kelloggs-seeklogo.svg",
    className: "h-12 w-auto",
  },
  {
    id: "nfl",
    alt: "NFL",
    light: "/logo/nfl-seeklogo-4.svg",
    className: "h-12 w-auto",
  },
  {
    id: "pg",
    alt: "Procter & Gamble",
    light: "/logo/procter-gamble-logo.svg",
    className: "h-11 w-auto",
  },
  {
    id: "wag",
    alt: "WAG",
    light: "/logo/WAG_Signature_logo_RGB.svg",
    className: "h-10 w-auto",
  },
  {
    id: "itg",
    alt: "ITG",
    light: "/logo/ITG.svg",
    className: "h-9 w-auto",
  },
];

export function ClientLogos() {
  return (
    <section
      className="border-b border-[var(--border)] py-12"
      aria-label="Clients"
    >
      <p className="mb-8 text-center text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
        Selected clients
      </p>

      <div className="relative w-full overflow-hidden">
        <InfiniteSlider
          className="flex h-[76px] w-full items-center"
          duration={32}
          gap={72}
        >
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex w-40 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100"
            >
              {logo.dark ? (
                <>
                  <img
                    src={withBase(logo.light)}
                    alt={logo.alt}
                    className={`${logo.className ?? "h-8 w-auto"} dark:hidden`}
                    draggable={false}
                  />
                  <img
                    src={withBase(logo.dark)}
                    alt={logo.alt}
                    className={`hidden ${logo.className ?? "h-8 w-auto"} dark:block`}
                    draggable={false}
                  />
                </>
              ) : (
                <img
                  src={withBase(logo.light)}
                  alt={logo.alt}
                  className={logo.className ?? "h-8 w-auto"}
                  draggable={false}
                />
              )}
            </div>
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
          direction="left"
          blurIntensity={1}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
          direction="right"
          blurIntensity={1}
        />
      </div>
    </section>
  );
}
