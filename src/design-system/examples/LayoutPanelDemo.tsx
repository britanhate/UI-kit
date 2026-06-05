import styles from "./LayoutPanelDemo.module.css";

const nav = [
  { href: "/hero", label: "Hero", description: "Перший екран." },
  { href: "/ui-kit/buttons", label: "Buttons", description: "Дії та посилання." },
];

export function LayoutPanelDemo() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Навігація">
        <a className={styles.homeLink} href="/">
          Design system
        </a>

        <nav className={styles.nav}>
          {nav.map((item, index) => (
            <a
              key={item.href}
              className={`${styles.navLink} ${index === 0 ? styles.navLinkActive : ""}`}
              href={item.href}
            >
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </a>
          ))}
        </nav>
      </aside>

      <section className={styles.content}>
        <h2>Контент сторінки</h2>
        <p>
          Layout тримає навігацію та робочу область окремо: sidebar відповідає за
          орієнтацію, а content — за документацію поточного розділу.
        </p>
      </section>
    </div>
  );
}
