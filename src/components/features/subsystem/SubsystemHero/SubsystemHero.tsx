import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./SubsystemHero.module.css";

type SubsystemHeroProps = ComponentPropsWithoutRef<"section"> & {
  label: string;
  title: string;
  description: string;
  backgroundImage: string;
};

export function SubsystemHero({
  label,
  title,
  description,
  backgroundImage,
  ...sectionProps
}: SubsystemHeroProps) {
  return (
    <section
      {...sectionProps}
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-labelledby="subsystem-hero-title"
    >
      <span className={styles.overlay} aria-hidden="true" />

      <div className={styles.nav}>
        <nav aria-label="Навігація" className={styles.breadcrumb}>
          <ol>
            <li>
              <Link href="/">Головна</Link>
            </li>
            <li>
              <Link href="/platform">Платформа</Link>
            </li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
      </div>

      <div className={styles.content}>
        <p className={styles.label}>{label}</p>

        <h1 id="subsystem-hero-title" className={styles.title}>
          {title}
        </h1>

        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}
