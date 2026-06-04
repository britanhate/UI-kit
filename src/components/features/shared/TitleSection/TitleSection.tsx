import styles from "./TitleSection.module.css";

type TitleSectionProps = {
  id?: string;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  className?: string;
};

export function TitleSection({
  id,
  title,
  subtitle,
  backgroundImage,
  className,
}: TitleSectionProps) {
  const classNames = [styles.section, className].filter(Boolean).join(" ");

  return (
    <section
      id={id}
      className={classNames}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(1, 1, 2, 0.62), rgba(1, 1, 2, 0.62)), url(${backgroundImage})`,
            }
          : undefined
      }
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 id={id ? `${id}-title` : undefined} className={styles.title}>
            {title}
          </h2>

          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
