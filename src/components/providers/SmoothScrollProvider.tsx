"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  stop: () => void;
  start: () => void;
};

type LenisConstructor = new (options?: {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
  anchors?: boolean;
  prevent?: (node: HTMLElement) => boolean;
}) => LenisInstance;

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let lenis: LenisInstance | null = null;
    let cancelled = false;
    let removeScrollLockListener: (() => void) | null = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    async function initLenis() {
      const lenisModule = await import("lenis");

      if (cancelled) return;

      const Lenis = lenisModule.default as LenisConstructor;

      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.72,
        touchMultiplier: 1,
        infinite: false,
        anchors: true,

        prevent: (node) => {
          return node.hasAttribute("data-lenis-prevent");
        },
      });

      if (document.body.dataset.dialogOpen === "true") {
        lenis.stop();
      }

      function handleScrollLockChange(event: Event) {
        const { isLocked } = (event as CustomEvent<{ isLocked: boolean }>).detail;

        if (isLocked) {
          lenis?.stop();
        } else {
          lenis?.start();
        }
      }

      window.addEventListener(
        "gisportal:scroll-lock-change",
        handleScrollLockChange,
      );

      removeScrollLockListener = () => {
        window.removeEventListener(
          "gisportal:scroll-lock-change",
          handleScrollLockChange,
        );
      };

      function raf(time: number) {
        lenis?.raf(time);
        frameRef.current = requestAnimationFrame(raf);
      }

      frameRef.current = requestAnimationFrame(raf);
    }

    initLenis();

    return () => {
      cancelled = true;
      removeScrollLockListener?.();
      removeScrollLockListener = null;

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      lenis?.destroy();
      lenis = null;
    };
  }, [pathname]);

  return children;
}
