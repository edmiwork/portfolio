"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { SwipeMarquee } from "@/components/ui/swipe-marquee";
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
  {
    id: "clubcamping",
    alt: "Club Camping",
    light: "/logo/Clubcamping%20Black.svg",
    dark: "/logo/Clubcamping%20white.svg",
    // Wide wordmark — cap width and let object-contain fit it within the slot.
    className: "h-11 w-auto max-w-[130px] object-contain",
  },
];

function LogoMark({ logo }: { logo: ClientLogo }) {
  const cls = logo.className ?? "h-8 w-auto";
  if (logo.dark) {
    return (
      <>
        <img
          src={withBase(logo.light)}
          alt={logo.alt}
          className={`${cls} dark:hidden`}
          draggable={false}
        />
        <img
          src={withBase(logo.dark)}
          alt={logo.alt}
          className={`hidden ${cls} dark:block`}
          draggable={false}
        />
      </>
    );
  }
  return (
    <img
      src={withBase(logo.light)}
      alt={logo.alt}
      className={cls}
      draggable={false}
    />
  );
}

export function ClientLogos() {
  return (
    <section
      className="border-b border-[var(--border)] py-12"
      aria-label="Clients"
    >
      <p className="mb-8 text-center text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
        Selected clients
      </p>

      {/* Desktop: framer slider with progressive-blur edges */}
      <div className="relative hidden w-full overflow-hidden md:block">
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
              <LogoMark logo={logo} />
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

      {/* Mobile: swipeable auto-scrolling marquee (no heavy backdrop blur) */}
      <SwipeMarquee className="items-center px-5 md:hidden" gapClassName="gap-10">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="flex h-[60px] w-28 shrink-0 items-center justify-center opacity-80"
          >
            <LogoMark logo={logo} />
          </div>
        ))}
      </SwipeMarquee>
    </section>
  );
}
