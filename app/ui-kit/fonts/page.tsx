import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";

const fontsTsx = `import localFont from "next/font/local";

const baseFont = localFont({
  src: [
    { path: "../public/fonts/Montserrat-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Montserrat-Medium.woff2", weight: "500" },
    { path: "../public/fonts/Montserrat-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-standard",
});

const headingFont = localFont({
  src: [
    { path: "../public/fonts/UAFSans-Regular.woff2", weight: "400" },
    { path: "../public/fonts/UAFSans-Medium.woff2", weight: "500" },
    { path: "../public/fonts/UAFSans-SemiBold.woff2", weight: "600" },
    { path: "../public/fonts/UAFSans-Bold.woff2", weight: "700" },
  ],
  variable: "--font-uaf",
});

export default function RootLayout({ children }) {
  return <html className={baseFont.variable + " " + headingFont.variable}>{children}</html>;
}`;

const fontsCss = `:root {
  --font-body: var(--font-standard), Arial, sans-serif;
  --font-heading: var(--font-uaf), Arial, sans-serif;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  --leading-tight: 1.1;
  --leading-relaxed: 1.6;
  --tracking-eyebrow: 0.16em;
}

body {
  font-family: var(--font-body);
}

h1, h2, h3, .button, .eyebrow {
  font-family: var(--font-heading);
}

.title {
  font-size: clamp(2.4rem, 1.35rem + 4vw, 5.4rem);
  line-height: var(--leading-tight);
}

.description {
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}`;

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
            <div className={docsStyles.grid3}>
              <article className={docsStyles.card}>
                <h3 style={{ fontSize: "clamp(2rem, 4vw, 4.8rem)" }}>Hero title</h3>
                <p>Для першого екрана і великих акцентних блоків.</p>
              </article>
              <article className={docsStyles.card}>
                <h3 style={{ fontSize: "clamp(1.6rem, 2.2vw, 3rem)" }}>Section title</h3>
                <p>Для назв секцій і службових сторінок.</p>
              </article>
              <article className={docsStyles.card}>
                <h3 style={{ fontSize: "1rem", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase" }}>Eyebrow</h3>
                <p>Для коротких label-рядків перед заголовком.</p>
              </article>
            </div>
          </Preview>
        </DocsSection>

        <DocsSection title="Правила">
          <div className={docsStyles.grid2}>
            <article className={docsStyles.card}><h3>Заголовки</h3><p>Великі, короткі, з малим line-height. Не робити довгі речення у h1/h2.</p></article>
            <article className={docsStyles.card}><h3>Описи</h3><p>Менший контраст, більший line-height. Опис має пояснювати дію або контекст, а не повторювати заголовок.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Як зробити кодом" description="Шрифти підключаються один раз у root layout. Компоненти далі використовують тільки семантичні змінні: body або heading.">
          <CodeExample tsx={fontsTsx} css={fontsCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
