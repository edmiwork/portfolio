"use client";

import { site, withBase } from "@/lib/site";
import { Reveal, RevealGroup } from "./Reveal";
import TiltImage from "./ui/tilt-image";

const skills = [
  "Brand Identity",
  "Visual Systems",
  "Web Design",
  "UI/UX",
  "Front-End",
  "Marketing Strategy",
  "Art Direction",
  "AI Workflows",
];

export function About() {
  return (
    <section id="about" className="px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Portrait / accent panel */}
        <Reveal>
          <TiltImage
            src={withBase("/pictures/foto%20de%20perfil%20copia.jpg")}
            alt={site.fullName}
            className="aspect-[4/5] rounded-3xl border border-[var(--border)]"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="font-neutrek mb-3 text-xs uppercase tracking-[0.35em] text-[var(--muted)] opacity-70">
              About me
            </p>
            <h2 className="font-foun uppercase text-[clamp(1.9rem,4.5vw,3.25rem)] leading-[1.05] tracking-[0.02em]">
              <span className="block">Hi, I&apos;m Edgar</span>
              <span className="block">
                I turn ideas into{" "}
                <span className="grad-text">visual systems</span> that last.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-7 space-y-4 text-[var(--muted)] sm:text-lg">
              <p>
                I&apos;m a Visual Communication Designer passionate about building
                brands, creating meaningful visual experiences, and solving
                communication challenges through design.
              </p>
              <p>
                My work combines branding, visual identity, web design, marketing
                strategy and digital content creation to help businesses connect
                with their audiences in a clear and memorable way. I enjoy
                transforming ideas into visual systems that not only look great
                but also support business goals and create lasting impact.
              </p>
              <p>
                I also integrate AI-powered tools into my creative process —
                exploring ideas faster, enhancing workflows and developing
                innovative solutions while keeping a strong strategic and
                human-centered approach.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="mt-8 flex flex-wrap gap-2.5">
            {skills.map((s) => (
              <Reveal as="span" key={s}>
                <span className="inline-block rounded-full border border-[var(--border)] px-4 py-2 text-sm">
                  {s}
                </span>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <a
              href={site.cvUrl}
              download
              className="btn btn-outline mt-8"
            >
              Download CV
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
              </svg>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
