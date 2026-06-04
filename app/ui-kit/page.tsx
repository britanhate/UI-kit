import type { CSSProperties } from "react";
import { CodeBlock, DocsPageHeader, DocsSection, DocsShell, docsStyles } from "@/design-system/DocsShell";
import { colorTokens } from "@/design-system/demoData";

export default function UiKitPage() {
  return (
    <DocsShell currentHref="/ui-kit">
      <DocsPageHeader
        eyebrow="04 / UI kit"
        title="Основи UI kit"
        description="UI kit описує не конкретні сторінки, а базові будівельні правила: кольори, типографіку, відступи, контури, кнопки, картки та стани. Назви мають бути семантичними, щоб компонент можна було переносити між сторінками без прив’язки до одного макету."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Кольори" description="Колір описується через роль у системі. Наприклад, Action accent — це не просто помаранчевий, а колір дії, фокусу і виділення.">
          <div className={docsStyles.tokenGrid}>
            {colorTokens.map(([name, value, usage]) => (
              <article key={name} className={docsStyles.card}>
                <span className={docsStyles.tokenSwatch} style={{ "--swatch": value } as CSSProperties} />
                <h3>{name}</h3>
                <p>{usage}</p>
                <p><code className={docsStyles.inlineCode}>{value}</code></p>
              </article>
            ))}
          </div>
        </DocsSection>

        <DocsSection title="Базові CSS variables">
          <CodeBlock>{`
:root {
  --color-bg: #010102;
  --color-text: #ffffff;
  --color-text-muted: #cccccc;
  --color-accent: #f39200;
  --color-border: #272727;

  --font-body: var(--font-standard), Arial, sans-serif;
  --font-heading: var(--font-uaf), Arial, sans-serif;

  --container-max: 1520px;
  --container-padding: clamp(1rem, 6vw, 7.25rem);
}
          `}</CodeBlock>
        </DocsSection>
      </div>
    </DocsShell>
  );
}
