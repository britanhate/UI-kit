import { AccentButton } from "@/components/ui/AccentButton";
import { MainHeroVideo } from "./MainHeroVideo";
import styles from "./MainHero.module.css";

type MainHeroProps = {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const DEFAULT_TITLE = 'ІКС "ГЕОІНФОРМАЦІЙНА СИСТЕМА МОУ"';
const DEFAULT_SHORT_TITLE = "ІКС ГІС МОУ";
const DEFAULT_SUBTITLE =
  "Єдине середовище доступу та управління геопросторовими сервісами.";

export function MainHero({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  ctaHref = "/platform",
  ctaLabel = "Увійти",
}: MainHeroProps) {
  const isDefaultTitle = title === DEFAULT_TITLE;

  return (
    <section
      className={styles.hero}
      aria-label={title}
    >
      <div className={styles.poster} aria-hidden="true" />
      <MainHeroVideo />

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.title} aria-label={title} title={title}>
          <span className={styles.titleFull}>{title}</span>
          <span className={styles.titleShort} aria-hidden="true">
            {isDefaultTitle ? DEFAULT_SHORT_TITLE : title}
          </span>
        </h1>

        <div className={styles.separator} aria-hidden="true" />

        <div className={styles.bottomRow}>
          <p className={styles.subtitle}>{subtitle}</p>

          <AccentButton href={ctaHref}>{ctaLabel}</AccentButton>
        </div>
      </div>
    </section>
  );
}
