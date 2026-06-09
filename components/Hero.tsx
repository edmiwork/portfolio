"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site, withBase } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center sm:px-8"
    >
      {/* ---- Diffused moving background ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {site.heroVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={site.heroVideoPoster ? withBase(site.heroVideoPoster) : undefined}
          >
            <source src={withBase(site.heroVideo)} type="video/mp4" />
          </video>
        ) : (
          <div className="mesh">
            <span className="mesh__blob mesh__blob--1" />
            <span className="mesh__blob mesh__blob--2" />
            <span className="mesh__blob mesh__blob--3" />
            <span className="mesh__blob mesh__blob--4" />
          </div>
        )}
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* ---- Name + title ---- */}
      <motion.h1
        initial={{ opacity: 0, y: reduce ? 0 : 24, filter: reduce ? "none" : "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: EASE }}
        className="font-foun text-[clamp(2.2rem,8vw,6rem)] uppercase leading-[0.9] tracking-[0.04em]"
      >
        {site.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        className="font-neutrek mt-5 text-[0.65rem] uppercase tracking-[0.35em] text-[var(--muted)] sm:text-xs"
      >
        Visual Designer
      </motion.p>
    </section>
  );
}
