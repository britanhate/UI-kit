"use client";

import {
  useEffect,
  useSyncExternalStore,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

import styles from "./Dialog.module.css";

type DialogProps = {
  children: ReactNode;
  onClose: () => void;
  titleId?: string;
  descriptionId?: string;
  ariaLabel?: string;
  overlayClassName?: string;
  panelClassName?: string;
  closeOnBackdrop?: boolean;
};

type DialogSectionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

type DialogCloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

function subscribeToHydration(onStoreChange: () => void) {
  const timeoutId = window.setTimeout(onStoreChange, 0);

  return () => window.clearTimeout(timeoutId);
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function Dialog({
  children,
  onClose,
  titleId,
  descriptionId,
  ariaLabel,
  overlayClassName,
  panelClassName,
  closeOnBackdrop = true,
}: DialogProps) {
  const isMounted = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );

  useBodyScrollLock(true);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      className={joinClassNames(styles.overlay, overlayClassName)}
      role="presentation"
      data-lenis-prevent
      onPointerDown={closeOnBackdrop ? onClose : undefined}
    >
      <dialog
        open
        className={joinClassNames(styles.panel, panelClassName)}
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-lenis-prevent
        onPointerDown={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>,
    document.body,
  );
}

export function DialogHeader({ children, className, ...props }: DialogSectionProps) {
  return (
    <header className={joinClassNames(styles.header, className)} {...props}>
      {children}
    </header>
  );
}

export function DialogBody({ children, className, ...props }: DialogSectionProps) {
  return (
    <div className={joinClassNames(styles.body, className)} {...props}>
      {children}
    </div>
  );
}

export function DialogFooter({ children, className, ...props }: DialogSectionProps) {
  return (
    <footer className={joinClassNames(styles.footer, className)} {...props}>
      {children}
    </footer>
  );
}

export function DialogCloseButton({
  label = "Закрити",
  className,
  children = "×",
  type = "button",
  ...props
}: DialogCloseButtonProps) {
  return (
    <button
      className={joinClassNames(styles.closeButton, className)}
      type={type}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
}
