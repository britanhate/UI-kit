import type { ReactNode } from "react";
import Link from "next/link";
import { designSystemNav } from "./navigation";
import { ExpandableCodeBlock } from "./ExpandableCodeBlock";
import styles from "./DocsShell.module.css";

export function DocsShell({
  currentHref,
  children,
}: Readonly<{
  currentHref: string;
  children: ReactNode;
}>) {
  return (
    <main className={styles.shell}>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Навігація дизайн-системи">
          <div className={styles.sidebarInner} data-lenis-prevent>
            <Link href="/" className={styles.homeLink}>
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
          </div>
        </aside>

        <div className={styles.content}>{children}</div>
      </div>
    </main>
  );
}

export function DocsPageHeader({
  eyebrow,
  title,
  description,
}: Readonly<{ eyebrow: string; title: string; description: string }>) {
  return (
    <header className={`${styles.page} ${styles.pageNarrow}`}>
      <p className={styles.breadcrumb}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
}

export function DocsSection({
  title,
  description,
  children,
}: Readonly<{ title: string; description?: string; children: ReactNode }>) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {description ? <p className={styles.sectionText}>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Preview({
  label,
  note,
  bleed = false,
  children,
}: Readonly<{ label: string; note?: string; bleed?: boolean; children: ReactNode }>) {
  return (
    <div className={`${styles.preview} ${bleed ? styles.previewBleed : ""}`}>
      <div className={styles.previewHeader}>
        <span>{label}</span>
        {note ? <span>{note}</span> : null}
      </div>
      <div className={styles.previewBody}>{children}</div>
    </div>
  );
}

export function CodeBlock({ children }: Readonly<{ children: string }>) {
  return <ExpandableCodeBlock>{children}</ExpandableCodeBlock>;
}

export function CodeExample({ tsx, css }: Readonly<{ tsx: string; css: string }>) {
  return (
    <div className={styles.codePair}>
      <div>
        <p className={styles.codeLabel}>TSX / JSX</p>
        <CodeBlock>{tsx}</CodeBlock>
      </div>
      <div>
        <p className={styles.codeLabel}>CSS module</p>
        <CodeBlock>{css}</CodeBlock>
      </div>
    </div>
  );
}

export { styles as docsStyles };
