import { Button } from "@/components/ui/Button";
import type { SanitizedArcgisItem } from "@/lib/arcgis/types";

import { GeospatialDocumentDownloadAction } from "../GeospatialDocumentDownloadAction";
import type { GeospatialDocumentAction } from "../documentActions";
import styles from "./GeospatialDocumentsGallery.module.css";

type GeospatialDocumentItemProps = {
  item: SanitizedArcgisItem;
  itemDate?: string;
  summary: string;
  action: GeospatialDocumentAction;
};

export function GeospatialDocumentItem({ item, itemDate, summary, action }: GeospatialDocumentItemProps) {
  return (
    <article className={styles.item}>
      <div className={styles.itemMeta}>
        <span>{item.type}</span>
        {itemDate ? <span>{itemDate}</span> : null}
      </div>

      <div className={styles.itemMain}>
        <h3>{item.card?.title || item.title}</h3>
        <p>{summary}</p>
      </div>

      <div className={styles.itemAction}>
        {action.type === "download" ? (
          <GeospatialDocumentDownloadAction action={action} className={styles.itemButton} />
        ) : null}

        {action.type === "disabled" ? (
          <Button type="button" variant="secondary" disabled className={styles.itemButton}>
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
            className={styles.itemButton}
          >
            {action.label}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
