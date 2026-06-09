"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Briefcase, User, Wrench, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { ShinyButton } from "@/components/ui/shiny-button";

const navItems = [
  { name: "About", url: "#about", icon: User },
  { name: "Work", url: "#work", icon: Briefcase },
  { name: "Services", url: "#services", icon: Wrench },
  { name: "Contact", url: "#contact", icon: Mail },
];

export function Nav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <NavBar items={navItems} />

      {/* Top-right controls — theme toggle + Let's talk CTA */}
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle color theme"
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full backdrop-blur-lg transition-colors duration-200"
          style={{
            background: "color-mix(in srgb, var(--bg-elev) 55%, transparent)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        >
          {mounted &&
            (isDark ? (
              <SunIcon className="h-[18px] w-[18px]" />
            ) : (
              <MoonIcon className="h-[18px] w-[18px]" />
            ))}
        </button>

        <ShinyButton
          onClick={() =>
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
          }
          className="!px-5 !py-2.5 !text-sm"
        >
          Let&apos;s talk
        </ShinyButton>
      </div>
    </>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M18.66 5.34l-1.41 1.41" />
    </svg>
  );
}
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
