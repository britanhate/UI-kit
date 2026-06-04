import { CodeExample, DocsPageHeader, DocsSection, DocsShell, docsStyles } from "@/design-system/DocsShell";

const panelTsx = `const nav = [
  { href: "/hero", label: "Hero", description: "Перший екран." },
  { href: "/ui-kit/buttons", label: "Buttons", description: "Дії та посилання." },
];

export function DocsLayout({ children, currentHref }: Props) {
  return (
    <main className={styles.shell}>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Навігація">
          <a className={styles.homeLink} href="/">Design system</a>

          <nav className={styles.nav}>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={item.href === currentHref ? styles.activeLink : styles.navLink}
              >
                <span>{item.label}</span>
                <small>{item.description}</small>
              </a>
            ))}
          </nav>
        </aside>

        <div className={styles.content}>{children}</div>
      </div>
    </main>
  );
}`;

const panelCss = `.shell {
  min-height: 100vh;
  padding-top: var(--header-height);
  background: var(--color-bg);
}

.layout {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  width: min(100%, 1920px);
  margin: 0 auto;
}

.sidebar {
  position: sticky;
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
  overflow: auto;
  border-right: 1px solid var(--color-border-soft);
  background: rgba(1, 1, 2, .92);
}

.homeLink,
.navLink,
.activeLink {
  display: block;
  color: var(--color-text-muted);
  text-decoration: none;
}

.homeLink {
  padding: var(--space-6);
  color: var(--color-text);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
}

.nav {
  display: grid;
  gap: var(--space-2);
  padding: 0 var(--space-5) var(--space-6);
}

.navLink,
.activeLink {
  border: 1px solid transparent;
  padding: var(--space-3);
}

.navLink:hover,
.navLink:focus-visible {
  border-color: var(--color-border-soft);
  color: var(--color-text);
  outline: none;
}

.activeLink {
  border-color: var(--color-accent-border);
  background: var(--color-accent-soft);
  color: var(--color-text);
}

.navLink span,
.activeLink span {
  display: block;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
}

.navLink small,
.activeLink small {
  display: block;
  margin-top: 4px;
  color: var(--color-text-faint);
  line-height: 1.4;
}

.content {
  min-width: 0;
}

@media (max-width: 1180px) {
  .layout { grid-template-columns: 1fr; }
  .sidebar {
    position: relative;
    top: auto;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--color-border-soft);
  }
}`;

export default function LayoutPanelPage() {
  return (
    <DocsShell currentHref="/layout-panel">
      <DocsPageHeader
        eyebrow="04 / Layout"
        title="Layout panel"
        description="Бокова панель потрібна для службових або документаційних сторінок, де багато розділів. Вона тримає навігацію поруч із контентом і не заважає читанню основної частини."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Правила панелі" description="Панель має бути стабільною, не перекривати header і не створювати горизонтальний scroll. На вузьких екранах вона переходить у верхній блок навігації.">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Sticky</h3><p>На desktop панель залишається на місці під header, щоб навігація була доступна під час читання.</p></article>
            <article className={docsStyles.card}><h3>Активний стан</h3><p>Поточна сторінка виділяється border і мʼяким accent-фоном.</p></article>
            <article className={docsStyles.card}><h3>Mobile</h3><p>Панель не фіксується збоку. Вона стає верхнім навігаційним блоком.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Як зробити кодом">
          <CodeExample tsx={panelTsx} css={panelCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
