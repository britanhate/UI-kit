import { AppCard } from "@/components/features/subsystem/geoportal/AppsSection/GeoportalAppCard";
import { GeospatialDocumentCard } from "@/components/features/subsystem/geospatial/GeospatialDocumentsSection/GeospatialDocumentCard";
import { demoAppItem, demoDocumentItem } from "@/design-system/demoData";

import styles from "./CardsDemo.module.css";

export function AppCardDemo() {
  return <AppCard item={demoAppItem} featured />;
}

export function DocumentCardsDemo() {
  return (
    <div className={styles.grid}>
      <GeospatialDocumentCard item={demoDocumentItem} />
      <GeospatialDocumentCard
        item={{
          ...demoDocumentItem,
          id: "demo-doc-2",
          title: "Другий приклад документа",
          downloadUrl: undefined,
        }}
      />
    </div>
  );
}
