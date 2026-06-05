import type { CSSProperties } from "react";

import styles from "./CardImplementation.module.css";

type CardItem = {
  type: string;
  date?: string;
  title: string;
  description: string;
  image?: string;
  actionLabel: string;
  href: string;
};

type ResourceCardProps = {
  item: CardItem;
  featured?: boolean;
};

export function ResourceCard({ item, featured = false }: ResourceCardProps) {
  const cardClassName = featured
    ? `${styles.card} ${styles.featured}`
    : styles.card;

  return (
    <article className={cardClassName}>
      {item.image ? (
        <div
          className={styles.media}
          style={{ "--card-image": `url(${item.image})` } as CSSProperties}
          aria-hidden="true"
        />
      ) : null}

      <div className={styles.body}>
        <p className={styles.meta}>
          <span>{item.type}</span>
          {item.date ? <span>{item.date}</span> : null}
        </p>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
        <a className={styles.action} href={item.href}>
          {item.actionLabel}
        </a>
      </div>
    </article>
  );
}

export function CardImplementationExample() {
  const appItem: CardItem = {
    type: "Web Experience",
    date: "25.05.2026",
    title: "Приклад веб застосунку для найвідповідальнішого землевпорядкування",
    description:
      "Картка показує, як виглядає застосунок із зображенням, metadata, коротким описом і основною дією.",
    image: "/images/geoportal/app-card.webp",
    actionLabel: "Відкрити",
    href: "#",
  };

  const documentItem: CardItem = {
    type: "Microsoft Word",
    date: "01.06.2026",
    title: "Приклад документа",
    description:
      "Картка документа використовується для матеріалів, які можна відкрити або завантажити через дію внизу картки.",
    actionLabel: "Завантажити",
    href: "#",
  };

  return (
    <div className={styles.grid}>
      <ResourceCard item={appItem} featured />
      <ResourceCard item={documentItem} />
    </div>
  );
}
