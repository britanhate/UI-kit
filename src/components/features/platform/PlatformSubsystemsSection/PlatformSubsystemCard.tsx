import Link from "next/link";

import { Button } from "@/components/ui/Button";
import type { SubsystemConfig } from "@/config/subsystems";

import { PlatformSubsystemDetailsAction } from "./PlatformSubsystemDetailsAction";
import styles from "./PlatformSubsystemCard.module.css";

type PlatformSubsystemCardProps = {
  subsystem: SubsystemConfig;
  index: number;
};

function isInternalPlatformHref(href: string) {
  return href === "/platform" || href.startsWith("/platform/");
}

export function PlatformSubsystemCard({
  subsystem,
  index,
}: PlatformSubsystemCardProps) {
  const cardNumber = String(index + 1).padStart(2, "0");
  const opensInNewTab = isInternalPlatformHref(subsystem.href);
  const linkTarget = opensInNewTab ? "_blank" : undefined;
  const linkRel = opensInNewTab ? "noreferrer" : undefined;

  return (
    <article
      className={styles.card}
      style={{ backgroundImage: `url(${subsystem.image})` }}
    >
      <span className={styles.overlay} aria-hidden="true" />

      <Link
        className={styles.cardLink}
        href={subsystem.href}
        target={linkTarget}
        rel={linkRel}
        aria-label={`Перейти до підсистеми: ${subsystem.title}`}
      />

      <div className={styles.content}>
        <p className={styles.label}>
          {"//"} Інформація / {cardNumber}
        </p>

        <h3 className={styles.title}>{subsystem.title}</h3>

        <p className={styles.description}>{subsystem.description}</p>

        {subsystem.tags.length > 0 ? (
          <div className={styles.tags} aria-label="Основні можливості">
            {subsystem.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className={styles.actions}>
          <Button
            href={subsystem.href}
            variant="primary"
            target={linkTarget}
            rel={linkRel}
          >
            Перейти
          </Button>

          <PlatformSubsystemDetailsAction subsystem={subsystem} />
        </div>
      </div>
    </article>
  );
}
