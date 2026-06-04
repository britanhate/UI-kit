import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SanitizedArcgisItem } from "@/lib/arcgis/types";

import { AppCard } from "./GeoportalAppCard";
import styles from "./GeoportalAppsSection.module.css";

type AppsSectionProps = {
  title: string;
  description: string;
  items: SanitizedArcgisItem[];
};

export function AppsSection({ title, description, items }: AppsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="apps-section-title">
      <SectionHeader
        titleId="apps-section-title"
        className={styles.header}
        label="Застосунки"
        title={title}
        description={description}
      />

      {items.length > 0 ? (
        <div className={styles.grid} data-count={items.length}>
          {items.map((item) => (
            <AppCard key={item.id} item={item} featured={items.length === 1} />
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