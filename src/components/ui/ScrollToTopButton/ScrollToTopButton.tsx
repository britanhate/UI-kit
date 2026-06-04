"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import styles from "./ScrollToTopButton.module.css";

type ScrollToTopButtonProps = {
  heroSelector?: string;
  footerSelector?: string;
  isStacked?: boolean;
};

type ScrollButtonStyle = CSSProperties & {
  "--scroll-top-footer-offset"?: string;
};

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ScrollToTopButton({
  heroSelector = "[data-scroll-top-hidden]",
  footerSelector = "[data-scroll-top-footer]",
  isStacked = false,
}: ScrollToTopButtonProps) {
  const isHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [footerOffset, setFooterOffset] = useState(0);

  const pressTimeoutRef = useRef<number | null>(null);
  const footerFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const heroElement = document.querySelector(heroSelector);

    if (!heroElement) {
      function handleScroll() {
        setIsVisible(window.scrollY > 80);
      }

      const frameId = window.requestAnimationFrame(handleScroll);

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("scroll", handleScroll);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.08,
      },
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, [heroSelector]);

  useEffect(() => {
    const footerElement = document.querySelector<HTMLElement>(footerSelector);

    if (footerElement === null) return;

    const footer = footerElement;

    function updateFooterOffset() {
      footerFrameRef.current = null;

      const footerRect = footer.getBoundingClientRect();
      const visibleFooterHeight = Math.max(
        0,
        window.innerHeight - footerRect.top,
      );

      setFooterOffset(Math.ceil(visibleFooterHeight));
    }

    function requestFooterOffsetUpdate() {
      if (footerFrameRef.current !== null) return;

      footerFrameRef.current = window.requestAnimationFrame(updateFooterOffset);
    }

    requestFooterOffsetUpdate();

    window.addEventListener("scroll", requestFooterOffsetUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestFooterOffsetUpdate);

    return () => {
      if (footerFrameRef.current !== null) {
        window.cancelAnimationFrame(footerFrameRef.current);
      }

      window.removeEventListener("scroll", requestFooterOffsetUpdate);
      window.removeEventListener("resize", requestFooterOffsetUpdate);
    };
  }, [footerSelector]);

  useEffect(() => {
    return () => {
      if (pressTimeoutRef.current !== null) {
        window.clearTimeout(pressTimeoutRef.current);
      }
    };
  }, []);

  function handleClick() {
    setIsPressed(true);

    if (pressTimeoutRef.current !== null) {
      window.clearTimeout(pressTimeoutRef.current);
    }

    pressTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
    }, 180);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!isHydrated) return null;

  const buttonStyle: ScrollButtonStyle = {
    "--scroll-top-footer-offset": `${footerOffset}px`,
  };

  return createPortal(
    <button
      type="button"
      className={styles.scrollToTopButton}
      data-visible={isVisible}
      data-pressed={isPressed}
      data-stacked={isStacked}
      style={buttonStyle}
      onClick={handleClick}
      aria-label="До гори"
    >
      <span className={styles.tooltip} aria-hidden="true">
        До гори
      </span>
      <svg
        className={styles.icon}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 14.25V3.75M9 3.75L4.75 8M9 3.75L13.25 8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>,
    document.body,
  );
}
