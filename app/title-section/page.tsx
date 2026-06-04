import { TitleSection } from "@/components/features/shared/TitleSection";
import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";

const titleSectionTsx = `type TitleSectionProps = {
  title: string;
  subtitle: string;
  backgroundImage?: string;
};

export function TitleSection({ title, subtitle, backgroundImage }: TitleSectionProps) {
  return (
    <section
      className={styles.section}
      style={backgroundImage ? { backgroundImage: \`linear-gradient(rgba(1,1,2,.72), rgba(1,1,2,.72)), url(\${backgroundImage})\` } : undefined}
    >
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}`;

const titleSectionCss = `.section {
  scroll-margin-top: var(--header-height);
  padding: clamp(5rem, 8vw, 9rem) var(--container-padding);
  background-color: var(--color-bg);
  background-position: center;
  background-size: cover;
  border-block: 1px solid var(--color-border);
}

.inner {
  width: min(100%, var(--container-lg));
  margin: 0 auto;
  text-align: center;
}

.title {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 4.4rem);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight-title);
}

.subtitle {
  max-width: 760px;
  margin: var(--space-5) auto 0;
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

@media (max-width: 640px) {
  .section {
    padding-inline: var(--space-4);
    text-align: left;
  }

  .inner {
    text-align: left;
  }
}`;

export default function TitleSectionPage() {
  return (
    <DocsShell currentHref="/title-section">
      <DocsPageHeader
        eyebrow="02 / Component"
        title="Title section"
        description="Title section — вступний блок між великими частинами сторінки. Він відділяє один змістовий розділ від іншого і коротко пояснює, що користувач побачить далі."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Візуальна схема" description="Це не hero. Тут немає навігації, карток або складних дій. Тільки заголовок, опис і фонова атмосфера.">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Пауза</h3><p>Секція дає візуальний розрив між блоками і готує до нового контексту.</p></article>
            <article className={docsStyles.card}><h3>Центр або лівий край</h3><p>На desktop може бути центрована. На mobile краще давати ліве вирівнювання.</p></article>
            <article className={docsStyles.card}><h3>Фон</h3><p>Зображення не має перебивати текст. Overlay або темна підкладка обовʼязкові.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Приклад у системі">
          <Preview label="Real component" note="TitleSection" bleed>
            <TitleSection
              title="Назва тематичного блоку"
              subtitle="Короткий опис, який пояснює контекст наступної частини сторінки."
              backgroundImage="/images/sections/main-title-bg.webp"
            />
          </Preview>
        </DocsSection>

        <DocsSection title="Як зробити кодом">
          <CodeExample tsx={titleSectionTsx} css={titleSectionCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
