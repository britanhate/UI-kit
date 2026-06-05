import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";
import { TitleSectionDemo } from "@/design-system/examples/TitleSectionDemo";

export default function TitleSectionPage() {
  return (
    <DocsShell currentHref="/title-section">
      <DocsPageHeader
        eyebrow="02 / Component"
        title="Title section"
        description="Title section — вступний блок між великими частинами сторінки. Він відділяє один змістовий розділ від іншого і коротко пояснює, що користувач побачить далі."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Візуальна схема" description="Це не hero. Тут немає навігації, карток або складних дій. Тільки заголовок, опис і фонова атмосфера.">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Пауза</h3><p>Секція дає візуальний розрив між блоками і готує до нового контексту.</p></article>
            <article className={docsStyles.card}><h3>Центр або лівий край</h3><p>На desktop може бути центрована. На mobile краще давати ліве вирівнювання.</p></article>
            <article className={docsStyles.card}><h3>Фон</h3><p>Зображення не має перебивати текст. Overlay або темна підкладка обовʼязкові.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Приклад у системі">
          <Preview label="Real component" note="TitleSection" bleed>
            <TitleSectionDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Реалізація компонента">
          <CodeExample
            tsxPath="src/design-system/examples/implementations/TitleSectionImplementation.tsx"
            cssPath="src/design-system/examples/implementations/TitleSectionImplementation.module.css"
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
