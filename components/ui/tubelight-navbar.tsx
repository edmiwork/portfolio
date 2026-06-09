"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  // Highlight the tab whose section is currently in view.
  useEffect(() => {
    const sections = items
      .map((i) => document.querySelector(i.url))
      .filter(Boolean) as Element[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const match = items.find((i) => i.url === `#${visible.target.id}`);
          if (match) setActiveTab(match.name);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:bottom-auto sm:top-4 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mb-0",
        className
      )}
    >
      <div
        className="flex items-center gap-1 rounded-full border px-1 py-1 shadow-lg backdrop-blur-lg"
        style={{
          background: "color-mix(in srgb, var(--bg-elev) 55%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200",
                isActive
                  ? "text-[var(--color-flame)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 w-full rounded-full"
                  style={{ background: "color-mix(in srgb, var(--color-flame) 8%, transparent)" }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-[var(--color-flame)]">
                    <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-[var(--color-flame)]/20 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-[var(--color-flame)]/20 blur-md" />
                    <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-[var(--color-flame)]/20 blur-sm" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
