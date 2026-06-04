"use client";

import { useEffect } from "react";

type ScrollLockSnapshot = {
  scrollY: number;
  htmlOverflow: string;
  htmlOverscrollBehavior: string;
  htmlScrollBehavior: string;
  bodyOverflow: string;
  bodyOverscrollBehavior: string;
  bodyPaddingRight: string;
};

let activeLockCount = 0;
let snapshot: ScrollLockSnapshot | null = null;

function emitScrollLockChange(isLocked: boolean) {
  window.dispatchEvent(
    new CustomEvent("gisportal:scroll-lock-change", {
      detail: { isLocked },
    }),
  );
}

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const { body, documentElement } = document;

    if (activeLockCount === 0) {
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

      snapshot = {
        scrollY,
        htmlOverflow: documentElement.style.overflow,
        htmlOverscrollBehavior: documentElement.style.overscrollBehavior,
        htmlScrollBehavior: documentElement.style.scrollBehavior,
        bodyOverflow: body.style.overflow,
        bodyOverscrollBehavior: body.style.overscrollBehavior,
        bodyPaddingRight: body.style.paddingRight,
      };

      emitScrollLockChange(true);

      documentElement.style.scrollBehavior = "auto";
      documentElement.style.overflow = "hidden";
      documentElement.style.overscrollBehavior = "none";
      documentElement.classList.add("lenis-stopped");

      body.dataset.dialogOpen = "true";
      body.style.overflow = "hidden";
      body.style.overscrollBehavior = "none";

      if (scrollbarWidth > 0) {
        body.style.paddingRight = snapshot.bodyPaddingRight
          ? `calc(${snapshot.bodyPaddingRight} + ${scrollbarWidth}px)`
          : `${scrollbarWidth}px`;
      }
    }

    activeLockCount += 1;

    return () => {
      activeLockCount = Math.max(0, activeLockCount - 1);

      if (activeLockCount > 0 || snapshot === null) return;

      const restoreScrollY = snapshot.scrollY;
      const restoredHtmlScrollBehavior = snapshot.htmlScrollBehavior;

      documentElement.style.scrollBehavior = "auto";
      documentElement.style.overflow = snapshot.htmlOverflow;
      documentElement.style.overscrollBehavior = snapshot.htmlOverscrollBehavior;
      documentElement.classList.remove("lenis-stopped");

      delete body.dataset.dialogOpen;
      body.style.overflow = snapshot.bodyOverflow;
      body.style.overscrollBehavior = snapshot.bodyOverscrollBehavior;
      body.style.paddingRight = snapshot.bodyPaddingRight;

      window.scrollTo({
        top: restoreScrollY,
        left: 0,
        behavior: "auto",
      });

      snapshot = null;
      emitScrollLockChange(false);

      window.requestAnimationFrame(() => {
        documentElement.style.scrollBehavior = restoredHtmlScrollBehavior;
      });
    };
  }, [isLocked]);
}
