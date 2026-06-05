import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";
import { TypographyDemo } from "@/design-system/examples/TypographyDemo";

export default function FontsPage() {
  return (
    <DocsShell currentHref="/ui-kit/fonts">
      <DocsPageHeader
        eyebrow="05 / UI kit"
        title="Fonts"
        description="Типографіка будується на двох ролях: body font для звичайного тексту і heading font для заголовків, кнопок, metadata та службових підписів. Візуально система має бути щільною, контрастною і технічною."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Ієрархія тексту">
          <Preview label="Typography scale">
            <TypographyDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Правила">
          <div className={docsStyles.grid2}>
            <article className={docsStyles.card}><h3>Заголовки</h3><p>Великі, короткі, з малим line-height. Не робити довгі речення у h1/h2.</p></article>
            <article className={docsStyles.card}><h3>Описи</h3><p>Менший контраст, більший line-height. Опис має пояснювати дію або контекст, а не повторювати заголовок.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Реалізація типографіки" description="Шрифти підключаються один раз у root layout. Компоненти далі використовують тільки семантичні змінні: body або heading.">
          <CodeExample
            tsxPath={[
              "src/design-system/examples/TypographyDemo.tsx",
              "app/layout.tsx",
            ]}
            cssPath={[
              "src/design-system/examples/TypographyDemo.module.css",
              "app/globals.css",
            ]}
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
