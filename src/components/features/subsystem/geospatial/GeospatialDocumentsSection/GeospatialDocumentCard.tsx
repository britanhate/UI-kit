import { Button } from "@/components/ui/Button";
import type { SanitizedArcgisItem } from "@/lib/arcgis/types";
import { stripHtmlToText } from "@/lib/text/html";
import { GeospatialDocumentDownloadAction } from "../GeospatialDocumentDownloadAction";
import { getPrimaryDocumentAction } from "../documentActions";
import styles from "./GeospatialDocumentCard.module.css";

type GeospatialDocumentCardProps = {
  item: SanitizedArcgisItem;
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
    return "Опис матеріалу буде доступний після оновлення метаданих елемента в ArcGIS Enterprise.";
  }

  return stripHtmlToText(source);
}

export function GeospatialDocumentCard({ item }: GeospatialDocumentCardProps) {
  const itemDate = formatItemDate(item);
  const summary = getItemSummary(item);
  const action = getPrimaryDocumentAction(item);

  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span>{item.type}</span>
        {itemDate ? <span>{itemDate}</span> : null}
      </div>

      <h3 className={styles.title}>{item.card?.title || item.title}</h3>

      <p className={styles.description}>{summary}</p>

      <div className={styles.action}>
        {action.type === "download" ? (
          <GeospatialDocumentDownloadAction action={action} />
        ) : null}

        {action.type === "disabled" ? (
          <Button type="button" variant="secondary" disabled>
            {action.label}
          </Button>
        ) : null}

        {action.type === "open" ? (
          <Button
            href={action.href}
            variant="secondary"
            external
            target="_blank"
            rel="noreferrer"
          >
            {action.label}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
