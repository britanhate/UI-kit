import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";
import { SpacingDemo } from "@/design-system/examples/SpacingDemo";

export default function PaddingsPage() {
  return (
    <DocsShell currentHref="/ui-kit/paddings">
      <DocsPageHeader
        eyebrow="06 / UI kit"
        title="Paddings і layout rhythm"
        description="Відступи мають бути системними. Секції не повинні випадково прилипати до краю, а картки не повинні мати різні внутрішні padding без причини. Основний підхід: container-padding + spacing scale + responsive clamp."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Spacing scale">
          <Preview label="Spacing tokens">
            <SpacingDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Правила відступів">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Сторінка</h3><p>Зовнішній відступ задає контейнер, а не кожен компонент окремо.</p></article>
            <article className={docsStyles.card}><h3>Секція</h3><p>Вертикальний ритм має бути більший за внутрішній padding карток.</p></article>
            <article className={docsStyles.card}><h3>Mobile</h3><p>На телефонах боковий padding зменшується, але не зникає.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Реалізація spacing scale" description="Сторінковий відступ задається секцією. Компонент не повинен сам вигадувати ширину контейнера, якщо він живе всередині стандартної сторінки.">
          <CodeExample
            tsxPath="src/design-system/examples/SpacingDemo.tsx"
            cssPath={[
              "src/design-system/examples/SpacingDemo.module.css",
              "app/globals.css",
            ]}
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
