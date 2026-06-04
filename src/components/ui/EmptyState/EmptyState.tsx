import type { ReactNode } from "react";

import styles from "./EmptyState.module.css";

type EmptyStateVariant = "dark" | "light";
type EmptyStateSize = "default" | "compact";

type EmptyStateProps = {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  variant?: EmptyStateVariant;
  size?: EmptyStateSize;
  "aria-live"?: "off" | "polite" | "assertive";
};

export function EmptyState({
  title,
  description,
  children,
  className,
  variant = "dark",
  size = "default",
  "aria-live": ariaLive,
}: EmptyStateProps) {
  const classNames = [
    styles.emptyState,
    styles[variant],
    size === "compact" ? styles.compact : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-live={ariaLive}>
      {title ? <p className={styles.title}>{title}</p> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </div>
  );
}
