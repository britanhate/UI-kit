import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import styles from "./AccentButton.module.css";

type AccentButtonVariant = "default" | "compact";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: AccentButtonVariant;
  title?: string;
  "aria-label"?: string;
};

type AccentButtonLinkProps = BaseProps & {
  href: string;
  external?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
};

type AccentButtonButtonProps = BaseProps & {
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type AccentButtonProps = AccentButtonLinkProps | AccentButtonButtonProps;

function shouldUseNativeAnchor(href: string, external?: boolean) {
  return external || href.startsWith("/api/auth/") || href.startsWith("#");
}

export function AccentButton(props: AccentButtonProps) {
  const variantClassName =
    props.variant === "compact" ? ` ${styles.compact}` : "";

  const className = `${styles.root}${variantClassName}${
    props.className ? ` ${props.className}` : ""
  }`;

  if ("href" in props && props.href) {
    const { href, external, target, rel, children, ...rest } = props;

    const linkRest = { ...rest };
    delete linkRest.className;
    delete linkRest.variant;

    if (shouldUseNativeAnchor(href, external)) {
      return (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? (rel ?? "noreferrer") : rel}
          {...linkRest}
          className={className}
        >
          <span className={styles.label}>{children}</span>
        </a>
      );
    }

    return (
      <Link href={href} {...linkRest} className={className}>
        <span className={styles.label}>{children}</span>
      </Link>
    );
  }

  const buttonProps = props as AccentButtonButtonProps;
  const { children, type, ...rest } = buttonProps;

  const buttonRest = { ...rest };
  delete buttonRest.className;
  delete buttonRest.variant;

  return (
    <button type={type ?? "button"} {...buttonRest} className={className}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}