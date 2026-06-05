import styles from "./SubsystemSectionImplementation.module.css";

type Subsystem = {
  title: string;
  description: string;
  image: string;
  meta: string;
  tags: string[];
  href: string;
};

type SubsystemSectionProps = {
  items: Subsystem[];
};

export function SubsystemSection({ items }: SubsystemSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="subsystems-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Підсистеми</p>
        <h2 id="subsystems-title" className={styles.title}>
          Геоінформаційні підсистеми платформи
        </h2>
        <p className={styles.description}>
          Оберіть необхідний напрям роботи для доступу до картографічних сервісів,
          геопросторових матеріалів та супровідних ресурсів.
        </p>
      </header>

      <div className={styles.grid}>
        {items.map((item) => (
          <article key={item.title} className={styles.card}>
            <img className={styles.image} src={item.image} alt="" />
            <span className={styles.overlay} aria-hidden="true" />

            <div className={styles.cardContent}>
              <p className={styles.meta}>{item.meta}</p>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
              <ul className={styles.tags} aria-label="Можливості">
                {item.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
              <a className={styles.action} href={item.href}>
                Перейти
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SubsystemSectionImplementationExample() {
  const items: Subsystem[] = [
    {
      title: "Геопортал",
      description: "Каталог веб-застосунків, карт і сервісів для щоденної роботи.",
      image: "/images/subsystems/geoportal.webp",
      meta: "Платформа",
      tags: ["Карти", "Сервіси", "Дані"],
      href: "#",
    },
    {
      title: "Геопросторові матеріали",
      description: "Документи та набори матеріалів із контрольованим доступом.",
      image: "/images/subsystems/geospatial.webp",
      meta: "Матеріали",
      tags: ["Документи", "Завантаження", "Метадані"],
      href: "#",
    },
  ];

  return <SubsystemSection items={items} />;
}
