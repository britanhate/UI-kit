import styles from "./HeroImplementation.module.css";

type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Hero({ title, subtitle, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className={styles.hero} aria-label={title}>
      <div className={styles.poster} aria-hidden="true" />
      <span className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.separator} aria-hidden="true" />

        <div className={styles.bottomRow}>
          <p className={styles.subtitle}>{subtitle}</p>
          {ctaHref && ctaLabel ? (
            <a className={styles.action} href={ctaHref}>
              {ctaLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function HeroImplementationExample() {
  return (
    <Hero
      title="Назва сторінки або сервісу"
      subtitle="Коротке пояснення призначення сторінки, сервісу або розділу. Один компактний абзац."
      ctaHref="#"
      ctaLabel="Основна дія"
    />
  );
}
