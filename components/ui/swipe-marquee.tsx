"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SwipeMarqueeProps = {
  children: ReactNode;
  /** Pixels advanced per animation frame. */
  speed?: number;
  /** Tailwind gap class for spacing between items. */
  gapClassName?: string;
  className?: string;
};

/**
 * Lightweight, touch-first marquee. Auto-scrolls continuously (like a CSS
 * marquee) but is a real native horizontal scroller, so the user can grab and
 * fling it with a finger. Auto-scroll pauses while interacting and resumes a
 * moment later. Uses `scrollLeft` (cheap, GPU-friendly) instead of per-frame
 * transforms — much smoother on mobile than JS transform animations.
 */
export function SwipeMarquee({
  children,
  speed = 0.4,
  gapClassName = "gap-12",
  className,
}: SwipeMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout>;

    const step = () => {
      // Skip work entirely when hidden (e.g. desktop where md: shows the other layout).
      if (el.offsetParent !== null && !paused) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += speed;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const scheduleResume = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, 1600);
    };

    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", scheduleResume);
    el.addEventListener("pointercancel", scheduleResume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", scheduleResume, { passive: true });

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", scheduleResume);
      el.removeEventListener("pointercancel", scheduleResume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", scheduleResume);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn("no-scrollbar flex w-full overflow-x-auto", gapClassName, className)}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {children}
      {children}
    </div>
  );
}
