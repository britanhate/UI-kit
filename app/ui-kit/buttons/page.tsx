import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";
import { ButtonDemo } from "@/design-system/examples/ButtonDemo";

export default function ButtonsPage() {
  return (
    <DocsShell currentHref="/ui-kit/buttons">
      <DocsPageHeader
        eyebrow="08 / UI kit"
        title="Buttons і links"
        description="Кнопки задають дії інтерфейсу. Вони мають бути прямокутними, контрастними, однаково високими і зрозумілими за пріоритетом: головна дія, другорядна дія, службове посилання."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Варіанти дій" description="Варіант кнопки вибирається за важливістю дії, а не за бажанням зробити блок декоративнішим.">
          <Preview label="Button states">
            <ButtonDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Правила використання">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Accent / Primary</h3><p>Одна головна дія в секції або картці. Не ставити кілька accent-кнопок поруч.</p></article>
            <article className={docsStyles.card}><h3>Secondary</h3><p>Додаткова дія: відкрити, завантажити, переглянути деталі.</p></article>
            <article className={docsStyles.card}><h3>Ghost</h3><p>Низький пріоритет: службові переходи, закриття, нейтральні дії.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Як зробити кодом" description="Компонент може рендерити або button, або link. Візуальний клас лишається спільним, щоб дія виглядала однаково.">
          <CodeExample
            tsxPath="src/design-system/examples/ButtonDemo.tsx"
            cssPath={[
              "src/design-system/examples/ButtonDemo.module.css",
              "src/components/ui/Button/Button.module.css",
              "src/components/ui/AccentButton/AccentButton.module.css",
              "src/components/ui/Badge/Badge.module.css",
            ]}
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
