import type { ReactNode } from "react";

import styles from "./ButtonImplementation.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  disabled?: boolean;
};

type BadgeProps = {
  children: ReactNode;
};

export function Button({
  children,
  href,
  type = "button",
  variant = "secondary",
  disabled = false,
}: ButtonProps) {
  const className = [
    styles.button,
    styles[variant],
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href && !disabled) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

export function Badge({ children }: BadgeProps) {
  return <span className={styles.badge}>{children}</span>;
}

export function ButtonImplementationExample() {
  return (
    <div className={styles.row}>
      <Button href="#" variant="primary">
        Accent action
      </Button>
      <Button type="button" variant="primary">
        Primary
      </Button>
      <Button type="button" variant="secondary">
        Secondary
      </Button>
      <Button type="button" variant="ghost">
        Ghost
      </Button>
      <Button type="button" variant="secondary" disabled>
        Disabled
      </Button>
      <Badge>Badge</Badge>
    </div>
  );
}
