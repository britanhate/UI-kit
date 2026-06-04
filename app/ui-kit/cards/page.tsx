import { AppCard } from "@/components/features/subsystem/geoportal/AppsSection/GeoportalAppCard";
import { GeospatialDocumentCard } from "@/components/features/subsystem/geospatial/GeospatialDocumentsSection/GeospatialDocumentCard";
import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";
import { demoAppItem, demoDocumentItem } from "@/design-system/demoData";

const cardTsx = `type CardItem = {
  type: string;
  date?: string;
  title: string;
  description: string;
  image?: string;
  actionLabel: string;
  href: string;
};

export function ResourceCard({ item }: { item: CardItem }) {
  return (
    <article className={styles.card}>
      {item.image ? <img className={styles.image} src={item.image} alt="" /> : null}

      <div className={styles.content}>
        <p className={styles.meta}>{item.type}{item.date ? <> · {item.date}</> : null}</p>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
        <a className={styles.action} href={item.href}>{item.actionLabel}</a>
      </div>
    </article>
  );
}`;

const cardCss = `.card {
  display: grid;
  min-height: 100%;
  border: 1px solid var(--color-border);
  background: var(--card-bg);
}

.image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border);
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: clamp(1.25rem, 2vw, 2rem);
}

.meta {
  margin: 0;
  color: var(--color-text-faint);
  font-family: var(--font-heading);
  font-size: var(--text-eyebrow);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
}

.title {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: var(--text-title-card);
  line-height: var(--leading-tight);
}

.description {
  margin: 0;
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.action {
  width: fit-content;
  margin-top: auto;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 0 18px;
  border: 1px solid var(--color-border-soft);
  color: var(--color-text);
}

.card:hover .action,
.action:focus-visible {
  border-color: var(--color-accent);
  outline: none;
}`;

export default function CardsPage() {
  return (
    <DocsShell currentHref="/ui-kit/cards">
      <DocsPageHeader
        eyebrow="09 / UI kit"
        title="Cards"
        description="Картка — контейнер для одного об’єкта: застосунку, документа, метрики або підсистеми. Вона має мати стабільну ієрархію: metadata → заголовок → опис → дія."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Картка застосунку">
          <Preview label="Real component" note="AppCard">
            <AppCard item={demoAppItem} featured />
          </Preview>
        </DocsSection>

        <DocsSection title="Картка документа">
          <Preview label="Real component" note="GeospatialDocumentCard">
            <div className={docsStyles.grid2}>
              <GeospatialDocumentCard item={demoDocumentItem} />
              <GeospatialDocumentCard item={{ ...demoDocumentItem, id: "demo-doc-2", title: "Другий приклад документа", downloadUrl: undefined }} />
            </div>
          </Preview>
        </DocsSection>

        <DocsSection title="Правила карток">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Контур</h3><p>Картки відділяються тонким border, а не важкими тінями або заокругленнями.</p></article>
            <article className={docsStyles.card}><h3>Metadata</h3><p>Тип, дата або номер — допоміжні. Вони не повинні конкурувати із заголовком.</p></article>
            <article className={docsStyles.card}><h3>Дія</h3><p>Дія знаходиться внизу, щоб користувач швидко її знаходив у будь-якій картці.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Як зробити кодом">
          <CodeExample tsx={cardTsx} css={cardCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
