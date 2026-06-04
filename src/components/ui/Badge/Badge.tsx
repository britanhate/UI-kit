import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Badge.module.css";

type BadgeVariant = "default" | "accent" | "muted" | "success" | "warning";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  const badgeClassName = [styles.root, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClassName} {...props}>
      {children}
    </span>
  );
}