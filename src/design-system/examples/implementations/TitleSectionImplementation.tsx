import type { CSSProperties } from "react";

import styles from "./TitleSectionImplementation.module.css";

type TitleSectionProps = {
  title: string;
  subtitle: string;
  backgroundImage?: string;
};

export function TitleSection({ title, subtitle, backgroundImage }: TitleSectionProps) {
  return (
    <section
      className={styles.section}
      style={
        backgroundImage
          ? ({ "--title-section-image": `url(${backgroundImage})` } as CSSProperties)
          : undefined
      }
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

export function TitleSectionImplementationExample() {
  return (
    <TitleSection
      title="Назва сторінки або великого розділу"
      subtitle="Короткий опис, який пояснює зміст сторінки. Один-два рядки без зайвої деталізації."
      backgroundImage="/images/geoportal/hero.webp"
    />
  );
}
