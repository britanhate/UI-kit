"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

import type { SubsystemConfig } from "@/config/subsystems";
import styles from "./LandingSubsystemCard.module.css";

type LandingSubsystemCardProps = {
  subsystem: SubsystemConfig;
  index?: number;
};

export function LandingSubsystemCard({
  subsystem,
  index = 0,
}: LandingSubsystemCardProps) {
  const ref = useScrollReveal<HTMLAnchorElement>();
  const staggerClass =
    index % 3 === 0
      ? "scroll-reveal-first"
      : index % 3 === 1
        ? "scroll-reveal-second"
        : "scroll-reveal-third";

  return (
    <a
      ref={ref}
      href={`/api/auth/portal-login?returnTo=${encodeURIComponent(subsystem.href)}`}
      className={`${styles.card} scroll-reveal ${staggerClass}`}
      style={{ backgroundImage: `url(${subsystem.image})` }}
      aria-label={`Перейти до підсистеми: ${subsystem.title}`}
    >
      <span className={styles.overlay} aria-hidden="true" />

      <span className={styles.content}>
        <span className={styles.title}>{subsystem.title}</span>

        <span className={styles.reveal}>
          <span className={styles.description}>{subsystem.description}</span>
          <span className={styles.cta}>Перейти</span>
        </span>
      </span>
    </a>
  );
}
