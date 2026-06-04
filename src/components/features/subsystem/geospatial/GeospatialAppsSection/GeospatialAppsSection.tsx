import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SanitizedArcgisItem } from "@/lib/arcgis/types";

import { GeospatialAppCard } from "./GeospatialAppCard";
import styles from "./GeospatialAppsSection.module.css";

type GeospatialAppsSectionProps = {
  title: string;
  description: string;
  items: SanitizedArcgisItem[];
};

export function GeospatialAppsSection({
  title,
  description,
  items,
}: GeospatialAppsSectionProps) {
  return (
    <section
      className={styles.section}
      aria-labelledby="geospatial-apps-title"
      id="apps"
    >
      <SectionHeader
        titleId="geospatial-apps-title"
        className={styles.header}
        label="Застосунки"
        title={title}
        description={description}
      />

      {items.length > 0 ? (
        <div className={styles.grid} data-count={items.length}>
          {items.map((item) => (
            <GeospatialAppCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Застосунки поки не додано"
          description="Після публікації елементів у відповідній групі ArcGIS Enterprise вони автоматично з’являться в цьому розділі."
        />
      )}
    </section>
  );
}