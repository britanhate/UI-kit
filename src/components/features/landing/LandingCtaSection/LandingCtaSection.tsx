import { AccentButton } from "@/components/ui/AccentButton";

import styles from "./LandingCtaSection.module.css";


export function LandingCtaSection(){
  return (
    <section
      className={styles.section}
      aria-labelledby="landing-cta-title"
    >
      <div className={styles.inner}>
        <h2 id="landing-cta-title" className={styles.title}>
          Перейдіть до роботи з геоінформаційними сервісами
        </h2>

        <p className={styles.description}>
          Авторизуйтесь у системі для доступу до підсистем, картографічних
          сервісів, геопросторових ресурсів та супровідних матеріалів.
        </p>

        <AccentButton href="/api/auth/portal-login?returnTo=/platform">
          Увійти до ІКС ГІС МОУ
        </AccentButton>
      </div>
    </section>
  );
}
