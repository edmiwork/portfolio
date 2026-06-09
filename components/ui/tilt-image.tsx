"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltImageProps {
  src: string;
  alt: string;
  /** Classes for the bordered container (e.g. aspect ratio, radius, border). */
  className?: string;
  /** Max tilt in degrees. */
  maxTilt?: number;
}

// Same cursor-reactive 3D tilt as the project cards, but without the spotlight
// blur/overlay — just the perspective rotation that follows the mouse.
export default function TiltImage({
  src,
  alt,
  className,
  maxTilt = 8,
}: TiltImageProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [canHover, setCanHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Disable the tilt on touch devices (no cursor to drive it).
  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const update = () => {
      const hasTouch =
        coarseMq.matches ||
        (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
      setCanHover(hoverMq.matches && !hasTouch);
    };
    update();
    hoverMq.addEventListener("change", update);
    coarseMq.addEventListener("change", update);
    return () => {
      hoverMq.removeEventListener("change", update);
      coarseMq.removeEventListener("change", update);
    };
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || !canHover) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setTilt({
        rotateY: ((x - 50) / 50) * maxTilt,
        rotateX: ((50 - y) / 50) * maxTilt,
      });
    },
    [canHover, maxTilt]
  );

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
      style={{
        transform: canHover
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
          : undefined,
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease-out",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}
