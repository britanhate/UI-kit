import { EmptyState } from "@/components/ui/EmptyState";
import type { SanitizedArcgisItem } from "@/lib/arcgis/types";

import type { GeospatialDocumentAction } from "../documentActions";
import { GeospatialDocumentItem } from "./GeospatialDocumentItem";
import styles from "./GeospatialDocumentsGallery.module.css";

export type PreparedGeospatialDocumentItem = {
  item: SanitizedArcgisItem;
  itemDate?: string;
  summary: string;
  action: GeospatialDocumentAction;
  searchableText: string;
};

type GeospatialDocumentsListProps = {
  items: PreparedGeospatialDocumentItem[];
};

export function GeospatialDocumentsList({ items }: GeospatialDocumentsListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        className={styles.emptyState}
        variant="light"
        title="Нічого не знайдено"
        description="Змініть пошуковий запит або оберіть інший тип матеріалу."
      />
    );
  }

  return (
    <div className={styles.list}>
      {items.map(({ item, itemDate, summary, action }) => (
        <GeospatialDocumentItem key={item.id} item={item} itemDate={itemDate} summary={summary} action={action} />
      ))}
    </div>
  );
}
