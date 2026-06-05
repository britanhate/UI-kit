import type { ReactNode } from "react";
import Link from "next/link";
import { designSystemNav } from "./navigation";
import { ExpandableCodeBlock } from "./ExpandableCodeBlock";
import { getSourceCode } from "./source/getSourceCode";
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

type SourcePath = string | string[];

type CodeExampleProps = Readonly<{
  tsxPath: SourcePath;
  cssPath?: SourcePath;
}>;

function toPathList(sourcePath?: SourcePath) {
  if (!sourcePath) return [];

  return Array.isArray(sourcePath) ? sourcePath : [sourcePath];
}

async function readSourceGroup(sourcePath: SourcePath) {
  const paths = toPathList(sourcePath);
  const files = await Promise.all(
    paths.map(async (sourceFilePath) => ({
      path: sourceFilePath,
      code: await getSourceCode(sourceFilePath),
    })),
  );

  if (files.length === 1) {
    return files[0].code;
  }

  return files
    .map((file) => `/* ${file.path} */\n${file.code.trimEnd()}`)
    .join("\n\n");
}

function getLabel(baseLabel: string, sourcePath: SourcePath) {
  const paths = toPathList(sourcePath);

  if (paths.length === 1) {
    return `${baseLabel} · ${paths[0]}`;
  }

  return `${baseLabel} · ${paths.length} files`;
}

export async function CodeExample({ tsxPath, cssPath }: CodeExampleProps) {
  const [tsx, css] = await Promise.all([
    readSourceGroup(tsxPath),
    cssPath ? readSourceGroup(cssPath) : Promise.resolve(undefined),
  ]);

  return (
    <div className={styles.codePair}>
      <div>
        <p className={styles.codeLabel}>{getLabel("TSX / JSX", tsxPath)}</p>
        <CodeBlock>{tsx}</CodeBlock>
      </div>
      {css && cssPath ? (
        <div>
          <p className={styles.codeLabel}>{getLabel("CSS module", cssPath)}</p>
          <CodeBlock>{css}</CodeBlock>
        </div>
      ) : null}
    </div>
  );
}

export { styles as docsStyles };
