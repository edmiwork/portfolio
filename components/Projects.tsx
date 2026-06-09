"use client";

import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { withBase } from "@/lib/site";
import { Reveal } from "./Reveal";
import ImageSpotlight from "./ui/image-spotlight";

const resolveSrc = (path?: string) =>
  !path ? "" : path.startsWith("http") ? path : withBase(path);

export function Projects() {
  return (
    <section id="work" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-neutrek mb-3 text-xs uppercase tracking-[0.35em] text-[var(--muted)] opacity-70">
              Selected work
            </p>
            <h2 className="font-foun uppercase text-[clamp(2rem,5vw,3.75rem)] leading-[1] tracking-[0.02em]">
              Projects &amp; <span className="grad-text">case studies</span>
            </h2>
          </div>
          <p className="max-w-sm text-[var(--muted)]">
            A selection of branding, packaging and digital work across
            healthcare, food, agriculture and culture.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const card = (
              <article className="group flex flex-col gap-4">
                <div className="relative">
                  <ImageSpotlight
                    src={resolveSrc(p.image)}
                    alt={p.title}
                    orientation="portrait"
                    config={{ spotlightSize: 110, overlayOpacity: 0.55 }}
                  />
                  <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>

                <div>
                  <p className="mb-1 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
                    {p.client} · {p.year}
                  </p>
                  <h3 className="flex items-start justify-between gap-2 text-lg font-semibold leading-tight">
                    <span>{p.title}</span>
                    <ArrowUpRight
                      size={18}
                      className="mt-0.5 shrink-0 text-[var(--color-flame)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </h3>
                </div>
              </article>
            );

            return (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={p.title}
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
