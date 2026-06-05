import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";
import { HeroDemo } from "@/design-system/examples/HeroDemo";

export default function HeroPage() {
  return (
    <DocsShell currentHref="/hero">
      <DocsPageHeader
        eyebrow="01 / Component"
        title="Hero"
        description="Hero — перший екран сторінки. Він пояснює, де користувач знаходиться, що це за розділ і яку основну дію можна виконати. Візуально це великий медіа-блок із затемненням, коротким текстом і одним головним CTA."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="З чого складається" description="Hero не має бути складною секцією. Його задача — швидко дати контекст, а не показати весь зміст сторінки.">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Фонове медіа</h3><p>Фото або відео займає всю площину. Обовʼязковий темний overlay, щоб текст був читабельний.</p></article>
            <article className={docsStyles.card}><h3>Текстовий блок</h3><p>Eyebrow, h1, короткий опис. Заголовок великий, але не повинен перетворюватися на довгий абзац.</p></article>
            <article className={docsStyles.card}><h3>Дія</h3><p>Одна основна дія. Якщо дій багато, це вже не hero, а окрема навігаційна секція.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Приклад у системі">
          <Preview label="Real component" note="MainHero" bleed>
            <HeroDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Реалізація компонента" description="Приклад нижче показує мінімальну структуру. У production-компоненті можна замінити img на video/poster, але візуальна схема лишається такою самою.">
          <CodeExample
            tsxPath="src/design-system/examples/implementations/HeroImplementation.tsx"
            cssPath="src/design-system/examples/implementations/HeroImplementation.module.css"
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
