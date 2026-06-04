"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

import styles from "./PlatformFloatingActions.module.css";

type BackButtonStyle = CSSProperties & {
  "--platform-back-footer-offset"?: string;
};

const SUBSYSTEM_PATHS = new Set([
  "/platform/geoportal",
  "/platform/geospatial",
]);

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function isSubsystemPath(pathname: string | null) {
  if (!pathname) return false;

  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  return SUBSYSTEM_PATHS.has(normalizedPathname);
}

export function PlatformFloatingActions() {
  const isHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const pathname = usePathname();
  const showBackToPlatform = isSubsystemPath(pathname);

  return (
    <>
      <ScrollToTopButton isStacked={showBackToPlatform} />
      {isHydrated && showBackToPlatform ? <BackToPlatformButton /> : null}
    </>
  );
}

function BackToPlatformButton() {
  const [footerOffset, setFooterOffset] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;

    function updateFooterOffset() {
      frameId = null;

      const footerElement = document.querySelector<HTMLElement>(
        "[data-scroll-top-footer]",
      );

      if (footerElement === null) {
        setFooterOffset(0);
        return;
      }

      const footerRect = footerElement.getBoundingClientRect();
      const visibleFooterHeight = Math.max(
        0,
        window.innerHeight - footerRect.top,
      );

      setFooterOffset(Math.ceil(visibleFooterHeight));
    }

    function requestFooterOffsetUpdate() {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(updateFooterOffset);
    }

    requestFooterOffsetUpdate();

    window.addEventListener("scroll", requestFooterOffsetUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestFooterOffsetUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestFooterOffsetUpdate);
      window.removeEventListener("resize", requestFooterOffsetUpdate);
    };
  }, []);

  const buttonStyle: BackButtonStyle = {
    "--platform-back-footer-offset": `${footerOffset}px`,
  };

  return createPortal(
    <Link
      className={styles.backButton}
      href="/platform"
      style={buttonStyle}
      aria-label="Назад до платформи"
    >
      <span className={styles.tooltip} aria-hidden="true">
        Назад до платформи
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
          d="M11.75 4.25L7 9L11.75 13.75M7.5 9H14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>,
    document.body,
  );
}
