import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";
import { AppCardDemo, DocumentCardsDemo } from "@/design-system/examples/CardsDemo";

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
            <AppCardDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Картка документа">
          <Preview label="Real component" note="GeospatialDocumentCard">
            <DocumentCardsDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Правила карток">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Контур</h3><p>Картки відділяються тонким border, а не важкими тінями або заокругленнями.</p></article>
            <article className={docsStyles.card}><h3>Metadata</h3><p>Тип, дата або номер — допоміжні. Вони не повинні конкурувати із заголовком.</p></article>
            <article className={docsStyles.card}><h3>Дія</h3><p>Дія знаходиться внизу, щоб користувач швидко її знаходив у будь-якій картці.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Реалізація компонента">
          <CodeExample
            tsxPath="src/design-system/examples/implementations/CardImplementation.tsx"
            cssPath="src/design-system/examples/implementations/CardImplementation.module.css"
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
