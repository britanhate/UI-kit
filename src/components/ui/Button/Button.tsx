import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  title?: string;
  "aria-label"?: string;
};

type ButtonLinkProps = BaseProps & {
  href: string;
  external?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
};

type ButtonElementProps = BaseProps & {
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = ButtonLinkProps | ButtonElementProps;

function shouldUseNativeAnchor(href: string, external?: boolean) {
  return external || href.startsWith("/api/auth/");
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";

  const className = [
    styles.root,
    styles[variant],
    styles[size],
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, external, target, rel, children, ...rest } = props;

    const linkRest = { ...rest };
    delete linkRest.className;
    delete linkRest.variant;
    delete linkRest.size;

    if (shouldUseNativeAnchor(href, external)) {
      return (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? (rel ?? "noreferrer") : rel}
          {...linkRest}
          className={className}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        {...linkRest}
        className={className}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonElementProps;
  const { children, type, ...rest } = buttonProps;

  const buttonRest = { ...rest };
  delete buttonRest.className;
  delete buttonRest.variant;
  delete buttonRest.size;

  return (
    <button type={type ?? "button"} {...buttonRest} className={className}>
      {children}
    </button>
  );
}
