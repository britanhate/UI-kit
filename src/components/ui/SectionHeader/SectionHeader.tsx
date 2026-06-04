import type { ReactNode } from "react";

import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  label?: ReactNode;
  titleId?: string;
  className?: string;
  action?: ReactNode;
  actionPlacement?: "side" | "below";
  size?: "default" | "compact";
  accentLine?: boolean;
};

export function SectionHeader({
  title,
  description,
  label,
  titleId,
  className,
  action,
  actionPlacement = "side",
  size = "default",
  accentLine = false,
}: SectionHeaderProps) {
  const rootClassName = [
    styles.header,
    styles[size],
    accentLine ? styles.accentLine : undefined,
    action ? styles.withAction : undefined,
    action && actionPlacement === "below" ? styles.actionBelow : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <div className={styles.content}>
        {label ? <p className={styles.label}>{label}</p> : null}

        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>

        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
      </div>

      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
