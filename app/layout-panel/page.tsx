import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";
import { LayoutPanelDemo } from "@/design-system/examples/LayoutPanelDemo";

export default function LayoutPanelPage() {
  return (
    <DocsShell currentHref="/layout-panel">
      <DocsPageHeader
        eyebrow="04 / Layout"
        title="Layout panel"
        description="Бокова панель потрібна для службових або документаційних сторінок, де багато розділів. Вона тримає навігацію поруч із контентом і не заважає читанню основної частини."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Правила панелі" description="Панель має бути стабільною, не перекривати header і не створювати горизонтальний scroll. На вузьких екранах вона переходить у верхній блок навігації.">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Sticky</h3><p>На desktop панель залишається на місці під header, щоб навігація була доступна під час читання.</p></article>
            <article className={docsStyles.card}><h3>Активний стан</h3><p>Поточна сторінка виділяється border і мʼяким accent-фоном.</p></article>
            <article className={docsStyles.card}><h3>Mobile</h3><p>Панель не фіксується збоку. Вона стає верхнім навігаційним блоком.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Реальний приклад layout-панелі">
          <Preview label="Layout panel">
            <LayoutPanelDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Як зробити кодом">
          <CodeExample
            tsxPath="src/design-system/examples/LayoutPanelDemo.tsx"
            cssPath="src/design-system/examples/LayoutPanelDemo.module.css"
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
