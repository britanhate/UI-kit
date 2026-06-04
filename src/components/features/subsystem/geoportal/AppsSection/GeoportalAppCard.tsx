import { AccentButton } from "@/components/ui/AccentButton";
import type { SanitizedArcgisItem } from "@/lib/arcgis/types";
import { getItemCardImage } from "@/lib/arcgis/subsystem-fetch";
import { stripHtmlToText } from "@/lib/text/html";

import styles from "./GeoportalAppCard.module.css";

type AppCardProps = {
  item: SanitizedArcgisItem;
  featured?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatItemDate(item: SanitizedArcgisItem) {
  const timestamp = item.modified ?? item.created;

  if (!timestamp) return undefined;

  return dateFormatter.format(new Date(timestamp));
}



function getItemSummary(item: SanitizedArcgisItem) {
  const source = item.card?.description || item.snippet || item.description;

  if (!source) {
    return "Опис застосунку буде доступний після оновлення метаданих елемента в ArcGIS Enterprise.";
  }

  return stripHtmlToText(source);
}

export function AppCard({ item, featured = false }: AppCardProps) {
  const image = getItemCardImage(item);
  const itemDate = formatItemDate(item);
  const summary = getItemSummary(item);

  const cardClassName = featured
    ? `${styles.card} ${styles.featured}`
    : styles.card;

  return (
    <article className={cardClassName}>
      <div
        className={image ? styles.media : styles.mediaPlaceholder}
        style={image ? { backgroundImage: `url(${image})` } : undefined}
        aria-hidden="true"
      >
        {!image ? <span>{item.type}</span> : null}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{item.type}</span>
          {itemDate ? <span>{itemDate}</span> : null}
        </div>

        <h3 className={styles.title}>{item.card?.title || item.title}</h3>

        <p className={styles.description}>{summary}</p>

        <div className={styles.action}>
          <AccentButton
            href={item.openUrl}
            external
            target="_blank"
            rel="noreferrer"
          >
            Відкрити
          </AccentButton>
        </div>
      </div>
    </article>
  );
}
