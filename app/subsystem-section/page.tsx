import { PlatformSubsystemsSection } from "@/components/features/platform/PlatformSubsystemsSection";
import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";

const subsystemTsx = `type Subsystem = {
  title: string;
  description: string;
  image: string;
  meta: string;
  tags: string[];
  href: string;
};

export function SubsystemSection({ items }: { items: Subsystem[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Підсистеми</p>
          <h2 className={styles.title}>Назва каталогу</h2>
          <p className={styles.description}>Короткий опис набору сервісів.</p>
        </header>

        <div className={styles.grid}>
          {items.map((item) => (
            <article key={item.title} className={styles.card}>
              <img className={styles.image} src={item.image} alt="" />
              <span className={styles.overlay} aria-hidden="true" />

              <div className={styles.cardContent}>
                <p className={styles.meta}>{item.meta}</p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.description}</p>
                <div className={styles.tags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a className={styles.action} href={item.href}>Перейти</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}`;

const subsystemCss = `.section {
  padding: var(--section-padding-y) var(--container-padding);
  background: var(--color-bg);
}

.inner {
  width: min(100%, var(--container-max));
  margin: 0 auto;
}

.header {
  max-width: 760px;
  margin-bottom: var(--section-header-gap);
}

.eyebrow,
.meta {
  color: var(--color-accent);
  font-family: var(--font-heading);
  font-size: var(--text-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
}

.title {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: var(--text-title-section);
  line-height: var(--leading-tight);
}

.description,
.cardText {
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.grid {
  display: grid;
  gap: var(--space-6);
}

.card {
  position: relative;
  min-height: clamp(360px, 42vw, 560px);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-neutral-900);
}

.image,
.overlay {
  position: absolute;
  inset: 0;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  background: linear-gradient(90deg, rgba(1,1,2,.78), rgba(1,1,2,.22));
}

.cardContent {
  position: relative;
  z-index: 1;
  max-width: 720px;
  padding: clamp(1.5rem, 4vw, 4rem);
  margin-top: auto;
}

.cardTitle {
  margin: var(--space-3) 0;
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3vw, 3.5rem);
  line-height: var(--leading-tight);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: var(--space-4) 0;
}

.tags span {
  padding: 6px 10px;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(1,1,2,.36);
  color: var(--color-text-muted);
}

.action {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid var(--color-accent);
  color: var(--color-text);
}

@media (max-width: 720px) {
  .section { padding-inline: var(--space-4); }
  .card { min-height: 520px; }
  .overlay { background: linear-gradient(0deg, rgba(1,1,2,.88), rgba(1,1,2,.26)); }
}`;

export default function SubsystemSectionPage() {
  return (
    <DocsShell currentHref="/subsystem-section">
      <DocsPageHeader
        eyebrow="03 / Component"
        title="Subsystem section"
        description="Subsystem section — каталог напрямів або сервісів. Він показує користувачу доступні підсистеми, пояснює різницю між ними і дає стабільну дію для переходу."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Анатомія секції" description="Секція складається з заголовкового блоку і набору великих карток. Картка не повинна бути просто банером — у ній має бути metadata, назва, короткий опис, теги і дія.">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Список</h3><p>Картки читаються як перелік сервісів. Користувач має швидко відрізнити одну підсистему від іншої.</p></article>
            <article className={docsStyles.card}><h3>Зображення</h3><p>Фон підсилює контекст, але не є основним носієм інформації. Текст завжди важливіший.</p></article>
            <article className={docsStyles.card}><h3>Дії</h3><p>Основний перехід має бути однаково розташований у всіх картках.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Приклад у системі">
          <Preview label="Real component" note="PlatformSubsystemsSection" bleed>
            <PlatformSubsystemsSection />
          </Preview>
        </DocsSection>

        <DocsSection title="Як зробити кодом">
          <CodeExample tsx={subsystemTsx} css={subsystemCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
