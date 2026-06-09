"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";

interface PerspectiveState {
  rotateX: number;
  rotateY: number;
}

interface SpotlightConfig {
  spotlightSize?: number;
  overlayOpacity?: number;
  className?: string;
}

interface ImageSpotlightProps {
  src: string;
  alt: string;
  orientation?: "landscape" | "portrait";
  width?: number;
  height?: number;
  config?: SpotlightConfig;
}

export default function ImageSpotlight({
  src,
  alt,
  orientation = "landscape",
  width,
  height,
  config = {},
}: ImageSpotlightProps) {
  const defaultConfig: Required<SpotlightConfig> = {
    spotlightSize: 80,
    overlayOpacity: 0.6,
    className: "",
  };
  const finalConfig = { ...defaultConfig, ...config };

  const [perspective, setPerspective] = useState<PerspectiveState>({
    rotateX: 0,
    rotateY: 0,
  });
  // Touch devices have no cursor — disable the spotlight reveal and show the
  // sharp image so the section is usable on mobile.
  const [canHover, setCanHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const narrowMq = window.matchMedia("(max-width: 767px)");
    // Disable the spotlight on any touch device. Some phones (notably Android)
    // wrongly report `hover: hover`, so we also rule out coarse pointers and
    // devices that expose touch points. We also disable it on narrow viewports
    // so the mobile layout (and desktop responsive mode) never shows the dark,
    // permanently-blurred image that has no cursor to reveal it.
    const update = () => {
      const hasTouch =
        coarseMq.matches ||
        (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
      setCanHover(hoverMq.matches && !hasTouch && !narrowMq.matches);
    };
    update();
    hoverMq.addEventListener("change", update);
    coarseMq.addEventListener("change", update);
    narrowMq.addEventListener("change", update);
    return () => {
      hoverMq.removeEventListener("change", update);
      coarseMq.removeEventListener("change", update);
      narrowMq.removeEventListener("change", update);
    };
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !canHover) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      containerRef.current.style.setProperty("--mouse-x", `${x}%`);
      containerRef.current.style.setProperty("--mouse-y", `${y}%`);
      const rotateY = ((x - 50) / 50) * 8;
      const rotateX = ((50 - y) / 50) * 8;
      setPerspective({ rotateX, rotateY });
    },
    [canHover]
  );

  const handleMouseLeave = () => setPerspective({ rotateX: 0, rotateY: 0 });

  const getContainerDimensions = (): React.CSSProperties => {
    if (width && height) {
      return { width: `${width}px`, height: `${height}px`, maxWidth: "100%" };
    }
    // No explicit size → fill the parent cell with an orientation aspect ratio.
    return {
      width: "100%",
      aspectRatio: orientation === "landscape" ? "16 / 9" : "4 / 5",
    };
  };

  const containerClasses = `
    relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-lg
    ${canHover ? "cursor-none" : ""}
    ${finalConfig.className}
  `.trim();

  return (
    <div className="flex items-center justify-center">
      <div
        ref={containerRef}
        className={containerClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label={alt}
        style={{
          ...getContainerDimensions(),
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          transform: canHover
            ? `perspective(1000px) rotateX(${perspective.rotateX}deg) rotateY(${perspective.rotateY}deg)`
            : undefined,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
        } as React.CSSProperties}
      >
        {/* Base image — blurred only while the spotlight is active on hover devices. */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          style={canHover ? { filter: "blur(5px)" } : undefined}
        />

        {canHover && (
          <>
            {/* Sharp image revealed through the spotlight mask. */}
            <img
              src={src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              style={{
                maskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black ${
                  finalConfig.spotlightSize * 0.4
                }px, transparent ${finalConfig.spotlightSize * 1.6}px)`,
                WebkitMaskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black ${
                  finalConfig.spotlightSize * 0.4
                }px, transparent ${finalConfig.spotlightSize * 1.6}px)`,
                zIndex: 2,
              }}
            />

            {/* Dark overlay everywhere except the spotlight. */}
            <div
              className="absolute inset-0 bg-black transition-all duration-100 ease-out will-change-[mask-position]"
              style={{
                opacity: finalConfig.overlayOpacity,
                maskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent ${
                  finalConfig.spotlightSize * 0.4
                }px, black ${finalConfig.spotlightSize * 1.6}px)`,
                WebkitMaskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent ${
                  finalConfig.spotlightSize * 0.4
                }px, black ${finalConfig.spotlightSize * 1.6}px)`,
                zIndex: 10,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
