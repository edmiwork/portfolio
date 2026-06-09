"use client";

import { services } from "@/lib/services";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section
      id="services"
      className="px-5 py-24 sm:py-32"
      style={{ background: "var(--bg-elev)" }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <p className="font-neutrek mb-3 text-xs uppercase tracking-[0.35em] text-[var(--muted)] opacity-70">
            What I do
          </p>
          <h2 className="font-foun uppercase text-[clamp(2rem,5vw,3.75rem)] leading-[1] tracking-[0.02em]">
            Services built around <span className="grad-text">your goals</span>
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-[var(--border)] sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <div
                className="group h-full p-8 transition-colors duration-300 sm:p-10"
                style={{ background: "var(--bg)" }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="grad-text font-display text-3xl">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-[-0.01em]">
                    {s.title}
                  </h3>
                </div>
                <p className="mb-6 text-[var(--muted)]">{s.description}</p>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--muted)]"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
