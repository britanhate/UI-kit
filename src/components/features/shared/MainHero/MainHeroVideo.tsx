"use client";

import { useEffect, useState } from "react";

import styles from "./MainHero.module.css";

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

export function MainHeroVideo() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const connection = (navigator as NavigatorWithConnection).connection;
    const saveDataEnabled = connection?.saveData === true;
    const isSlowConnection =
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (prefersReducedMotion || saveDataEnabled || isSlowConnection) {
      return;
    }

    const loadVideo = () => {
      setShouldLoadVideo(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointermove", loadVideo);
      window.removeEventListener("scroll", loadVideo);
      window.removeEventListener("keydown", loadVideo);
      window.removeEventListener("touchstart", loadVideo);
    };

    window.addEventListener("pointermove", loadVideo, {
      passive: true,
      once: true,
    });
    window.addEventListener("scroll", loadVideo, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", loadVideo, { once: true });
    window.addEventListener("touchstart", loadVideo, {
      passive: true,
      once: true,
    });

    return cleanup;
  }, []);

  if (!shouldLoadVideo || hasVideoError) return null;

  return (
    <video
      className={`${styles.video} ${isVideoReady ? styles.videoReady : ""}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/hero/main-hero-poster.webp"
      aria-hidden="true"
      onCanPlay={() => setIsVideoReady(true)}
      onPlaying={() => setIsVideoReady(true)}
      onError={() => {
        setHasVideoError(true);
        setIsVideoReady(false);
      }}
    >
      <source src="/videos/hero/main-hero.webm" type="video/webm" />
    </video>
  );
}
