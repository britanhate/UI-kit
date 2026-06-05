import type { ReactNode } from "react";

import styles from "./LayoutPanelDemo.module.css";

type NavItem = {
  href: string;
  label: string;
  description: string;
};

type LayoutPanelProps = {
  items: NavItem[];
  currentHref: string;
  children: ReactNode;
};

const nav = [
  { href: "/hero", label: "Hero", description: "Перший екран." },
  { href: "/ui-kit/buttons", label: "Buttons", description: "Дії та посилання." },
];

function LayoutPanel({ items, currentHref, children }: LayoutPanelProps) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Навігація">
        <a className={styles.homeLink} href="/">
          Design system
        </a>

        <nav className={styles.nav}>
          {items.map((item) => {
            const isActive = item.href === currentHref;

            return (
              <a
                key={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </a>
            );
          })}
        </nav>
      </aside>

      <section className={styles.content}>{children}</section>
    </div>
  );
}

export function LayoutPanelDemo() {
  return (
    <LayoutPanel items={nav} currentHref="/hero">
      <h2>Контент сторінки</h2>
      <p>
        Layout тримає навігацію та робочу область окремо: sidebar відповідає за
        орієнтацію, а content — за документацію поточного розділу.
      </p>
    </LayoutPanel>
  );
}
