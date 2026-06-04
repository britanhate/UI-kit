import type { CSSProperties } from "react";
import { CodeExample, DocsPageHeader, DocsSection, DocsShell, docsStyles } from "@/design-system/DocsShell";
import { spacingTokens } from "@/design-system/demoData";

function pxNumber(value: string) {
  return Number(value.replace("px", ""));
}

const layoutTsx = `export function PageSection({ title, description, children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}`;

const layoutCss = `:root {
  --container-max: 1520px;
  --container-padding: clamp(1rem, 6vw, 7.25rem);
  --section-padding-y: clamp(4.5rem, 5vw + 2rem, 8rem);
  --section-header-gap: clamp(36px, 4vw, 64px);
}

.section {
  padding: var(--section-padding-y) var(--container-padding);
}

.inner {
  width: min(100%, var(--container-max));
  margin: 0 auto;
}

.header {
  max-width: 820px;
  margin-bottom: var(--section-header-gap);
}

.title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: var(--text-title-section);
  line-height: var(--leading-tight);
}

.description {
  max-width: 760px;
  margin: var(--space-4) 0 0;
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

@media (max-width: 640px) {
  .section {
    padding-inline: var(--space-4);
  }
}`;

export default function PaddingsPage() {
  return (
    <DocsShell currentHref="/ui-kit/paddings">
      <DocsPageHeader
        eyebrow="06 / UI kit"
        title="Paddings і layout rhythm"
        description="Відступи мають бути системними. Секції не повинні випадково прилипати до краю, а картки не повинні мати різні внутрішні padding без причини. Основний підхід: container-padding + spacing scale + responsive clamp."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Spacing scale">
          <div className={docsStyles.spacingScale}>
            {spacingTokens.map(([name, value]) => (
              <div key={name} className={docsStyles.spacingRow}>
                <strong>{name}</strong>
                <span className={docsStyles.spacingBar} style={{ "--bar-width": `${pxNumber(value) * 3}px` } as CSSProperties} />
                <code>{value}</code>
              </div>
            ))}
          </div>
        </DocsSection>

        <DocsSection title="Правила відступів">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Сторінка</h3><p>Зовнішній відступ задає контейнер, а не кожен компонент окремо.</p></article>
            <article className={docsStyles.card}><h3>Секція</h3><p>Вертикальний ритм має бути більший за внутрішній padding карток.</p></article>
            <article className={docsStyles.card}><h3>Mobile</h3><p>На телефонах боковий padding зменшується, але не зникає.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Як зробити кодом" description="Сторінковий відступ задається секцією. Компонент не повинен сам вигадувати ширину контейнера, якщо він живе всередині стандартної сторінки.">
          <CodeExample tsx={layoutTsx} css={layoutCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
