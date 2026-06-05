"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

import { designSystemNav } from "./navigation";
import styles from "./DocsShell.module.css";

export function DocsMobileNavigation({ currentHref }: Readonly<{ currentHref: string }>) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={styles.mobileNavBar}>
        <button
          className={styles.mobileNavButton}
          type="button"
          aria-expanded={isOpen}
          aria-controls="design-system-mobile-navigation"
          onClick={() => setIsOpen(true)}
        >
          ☰ Розділи
        </button>
      </div>

      <div
        className={`${styles.mobileNavBackdrop} ${isOpen ? styles.mobileNavBackdropOpen : ""}`}
        aria-hidden="true"
        hidden={!isOpen}
        onClick={closeMenu}
      />

      <aside
        id="design-system-mobile-navigation"
        className={`${styles.mobileNavPanel} ${isOpen ? styles.mobileNavPanelOpen : ""}`}
        aria-label="Навігація дизайн-системи"
        aria-labelledby={titleId}
        aria-modal="true"
        role="dialog"
        hidden={!isOpen}
        data-lenis-prevent
      >
        <div className={styles.mobileNavHeader}>
          <h2 id={titleId} className={styles.mobileNavTitle}>
            Розділи
          </h2>
          <button className={styles.mobileNavClose} type="button" onClick={closeMenu}>
            Закрити
          </button>
        </div>

        <Link href="/" className={styles.homeLink} onClick={closeMenu}>
          <span className={styles.homeLabel}>Design system</span>
          <span className={styles.homeTitle}>Жива документація GIS Portal</span>
        </Link>

        {designSystemNav.map((group) => (
          <section key={group.title} className={styles.navGroup}>
            <h2 className={styles.navTitle}>{group.title}</h2>
            <ul className={styles.navList}>
              {group.items.map((item) => {
                const isActive = item.href === currentHref;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      <span className={styles.navLinkLabel}>{item.label}</span>
                      <span className={styles.navLinkDescription}>{item.description}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </aside>
    </>
  );
}
