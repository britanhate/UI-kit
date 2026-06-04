import { MainHero } from "@/components/features/shared/MainHero";
import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";

const heroTsx = `type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage: string;
};

export function Hero({ title, subtitle, ctaLabel, ctaHref, backgroundImage }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="page-hero-title">
      <img className={styles.media} src={backgroundImage} alt="" />
      <span className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Назва розділу</p>
          <h1 id="page-hero-title" className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {ctaHref && ctaLabel ? <a className={styles.action} href={ctaHref}>{ctaLabel}</a> : null}
        </div>
      </div>
    </section>
  );
}`;

const heroCss = `.hero {
  position: relative;
  min-height: clamp(520px, 76vh, 840px);
  display: grid;
  overflow: hidden;
  background: var(--color-bg);
}

.media,
.overlay {
  position: absolute;
  inset: 0;
}

.media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  background: linear-gradient(90deg, rgba(1,1,2,.82), rgba(1,1,2,.34));
}

.inner {
  position: relative;
  z-index: 1;
  width: min(100%, var(--container-max));
  margin: 0 auto;
  padding: var(--header-height) var(--container-padding) clamp(2rem, 6vw, 5rem);
  display: flex;
  align-items: end;
}

.content {
  max-width: 760px;
}

.eyebrow {
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
  font-size: clamp(2.4rem, 5vw, 5.6rem);
  line-height: var(--leading-tight);
}

.subtitle {
  max-width: 680px;
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.action {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid var(--color-accent);
  color: var(--color-text);
}

@media (max-width: 640px) {
  .hero { min-height: 620px; }
  .inner { padding-inline: var(--space-4); }
}`;

export default function HeroPage() {
  return (
    <DocsShell currentHref="/hero">
      <DocsPageHeader
        eyebrow="01 / Component"
        title="Hero"
        description="Hero — перший екран сторінки. Він пояснює, де користувач знаходиться, що це за розділ і яку основну дію можна виконати. Візуально це великий медіа-блок із затемненням, коротким текстом і одним головним CTA."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="З чого складається" description="Hero не має бути складною секцією. Його задача — швидко дати контекст, а не показати весь зміст сторінки.">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Фонове медіа</h3><p>Фото або відео займає всю площину. Обовʼязковий темний overlay, щоб текст був читабельний.</p></article>
            <article className={docsStyles.card}><h3>Текстовий блок</h3><p>Eyebrow, h1, короткий опис. Заголовок великий, але не повинен перетворюватися на довгий абзац.</p></article>
            <article className={docsStyles.card}><h3>Дія</h3><p>Одна основна дія. Якщо дій багато, це вже не hero, а окрема навігаційна секція.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Приклад у системі">
          <Preview label="Real component" note="MainHero" bleed>
            <MainHero
              title="Назва сторінки або сервісу"
              subtitle="Коротке пояснення призначення сторінки, сервісу або розділу. Один компактний абзац."
              ctaHref="#"
              ctaLabel="Основна дія"
            />
          </Preview>
        </DocsSection>

        <DocsSection title="Як зробити кодом" description="Приклад нижче показує мінімальну структуру. У production-компоненті можна замінити img на video/poster, але візуальна схема лишається такою самою.">
          <CodeExample tsx={heroTsx} css={heroCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
