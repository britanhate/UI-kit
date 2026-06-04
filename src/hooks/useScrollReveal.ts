import { useEffect, useRef } from "react";

/**
 * Hook to trigger animations when elements enter the viewport
 * Uses IntersectionObserver for optimal performance
 * Respects prefers-reduced-motion
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Still mark as visible for styling, just no animation
      if (ref.current) {
        ref.current.classList.add("is-visible");
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Once visible, stop observing (animation runs once)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Trigger animation when element is 10% visible
        threshold: 0.1,
        // Add margin to start animation before element enters viewport
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}
