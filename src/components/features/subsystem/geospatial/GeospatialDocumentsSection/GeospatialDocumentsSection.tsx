import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SanitizedArcgisItem } from "@/lib/arcgis/types";

import { GeospatialDocumentCard } from "./GeospatialDocumentCard";
import { GeospatialDocumentsGalleryAction } from "./GeospatialDocumentsGalleryAction";
import styles from "./GeospatialDocumentsSection.module.css";

type GeospatialDocumentsSectionProps = {
  id: string;
  title: string;
  description: string;
  label?: string;
  emptyTitle?: string;
  emptyText?: string;
  items: SanitizedArcgisItem[];
};

const PREVIEW_LIMIT = 3;

function createTitleId(title: string) {
  return `documents-${title
    .toLowerCase()
    .replace(/[^a-zа-яіїєґ0-9]+/giu, "-")
    .replace(/^-|-$/g, "")}`;
}

export function GeospatialDocumentsSection({
  id,
  title,
  description,
  label = "Матеріали",
  emptyTitle = "Матеріали поки не додано",
  emptyText = "Після публікації елементів у відповідній групі ArcGIS Enterprise вони автоматично з’являться в цьому розділі.",
  items,
}: GeospatialDocumentsSectionProps) {
  const previewItems = items.slice(0, PREVIEW_LIMIT);
  const titleId = createTitleId(title);

  return (
    <section className={styles.section} aria-labelledby={titleId} id={id}>
      <SectionHeader
        titleId={titleId}
        className={styles.header}
        accentLine
        label={label}
        title={title}
        description={description}
        actionPlacement="below"
        action={
          items.length > 0 ? (
            <GeospatialDocumentsGalleryAction
              title={title}
              description={description}
              items={items}
            />
          ) : null
        }
      />

      {previewItems.length > 0 ? (
        <div className={styles.grid}>
          {previewItems.map((item) => (
            <GeospatialDocumentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState title={emptyTitle} description={emptyText} />
      )}
    </section>
  );
}