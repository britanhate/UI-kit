import { apps24 } from "@esri/calcite-ui-icons/js/apps24.js";
import { grid24 } from "@esri/calcite-ui-icons/js/grid24.js";
import { layers24 } from "@esri/calcite-ui-icons/js/layers24.js";
import { lock24 } from "@esri/calcite-ui-icons/js/lock24.js";

import styles from "./SubsystemIntroSection.module.css";

type SubsystemIntroIcon = "apps" | "layers" | "lock" | "grid";

type SubsystemIntroPoint = {
  title: string;
  description?: string;
  icon: SubsystemIntroIcon;
  href?: string;
};

type SubsystemIntroSectionProps = {
  label: string;
  title: string;
  description: string;
  points?: SubsystemIntroPoint[];
};

const icons: Record<SubsystemIntroIcon, string> = {
  apps: apps24,
  layers: layers24,
  lock: lock24,
  grid: grid24,
};

function PointContent({ point }: { point: SubsystemIntroPoint }) {
  return (
    <>
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d={icons[point.icon]} />
        </svg>
      </span>

      <div className={styles.pointContent}>
        <h3>{point.title}</h3>

        {point.description ? <p>{point.description}</p> : null}
      </div>
    </>
  );
}

export function SubsystemIntroSection({
  label,
  title,
  description,
  points = [],
}: SubsystemIntroSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="subsystem-intro-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.label}>{label}</p>

          <h2 id="subsystem-intro-title" className={styles.title}>
            {title}
          </h2>

          <p className={styles.description}>{description}</p>
        </div>

        {points.length > 0 ? (
          <div className={styles.points} aria-label="Ключові можливості">
            {points.map((point) =>
              point.href ? (
                <a
                  key={point.title}
                  className={styles.point}
                  href={point.href}
                  aria-label={`Перейти до секції: ${point.title}`}
                >
                  <PointContent point={point} />
                </a>
              ) : (
                <article key={point.title} className={styles.point}>
                  <PointContent point={point} />
                </article>
              ),
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}