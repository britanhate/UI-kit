"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./Header.module.css";

const SOLID_THRESHOLD_RATIO = 0.4;
const MIN_SCROLL_DELTA = 14;

type HeaderShellProps = {
  children: React.ReactNode;
};

export function HeaderShell({ children }: HeaderShellProps) {
  const [isSolid, setIsSolid] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const isSolidRef = useRef(false);
  const isHiddenRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateHeaderState = () => {
      const currentY = Math.max(window.scrollY, 0);
      const threshold = window.innerHeight * SOLID_THRESHOLD_RATIO;

      const nextSolid = currentY >= threshold;
      const delta = currentY - lastScrollYRef.current;

      const isScrollingDown = delta > MIN_SCROLL_DELTA;
      const isScrollingUp = delta < -MIN_SCROLL_DELTA;

      let nextHidden = isHiddenRef.current;

      if (currentY < threshold) {
        nextHidden = false;
      } else if (isScrollingDown) {
        nextHidden = true;
      } else if (isScrollingUp) {
        nextHidden = false;
      }

      if (nextSolid !== isSolidRef.current) {
        isSolidRef.current = nextSolid;
        setIsSolid(nextSolid);
      }

      if (nextHidden !== isHiddenRef.current) {
        isHiddenRef.current = nextHidden;
        setIsHidden(nextHidden);
      }

      lastScrollYRef.current = currentY;
      tickingRef.current = false;
    };

    const onScrollOrResize = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const headerClassName = [
    styles.header,
    isSolid ? styles.headerSolid : styles.headerTop,
    isHidden ? styles.headerHidden : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <header className={headerClassName}>{children}</header>;
}