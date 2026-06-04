import { CodeBlock, DocsPageHeader, DocsSection, DocsShell, docsStyles } from "@/design-system/DocsShell";

export default function AdaptivePage() {
  return (
    <DocsShell currentHref="/adaptive">
      <DocsPageHeader
        eyebrow="10 / Behavior"
        title="Адаптив без окремого макету"
        description="Адаптив описується правилами, а не окремими картинками для кожної ширини. Компонент має знати, що з ним відбувається на desktop, tablet і phone: як переноситься текст, як змінюється сітка, що стає компактним."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Основні правила">
          <div className={docsStyles.grid2}>
            <article className={docsStyles.card}>
              <h3>Header</h3>
              <ul>
                <li>Довга назва скорочується до компактної.</li>
                <li>Touch-зони не менші за 44px.</li>
                <li>Навігація не повинна ламати рядок хаотично.</li>
              </ul>
            </article>
            <article className={docsStyles.card}>
              <h3>Footer</h3>
              <ul>
                <li>На телефоні не покладатися на hover.</li>
                <li>Посилання і контакти мають бути видимі або явно відкриватися.</li>
                <li>Колонки переходять в одну колонку.</li>
              </ul>
            </article>
            <article className={docsStyles.card}>
              <h3>Cards</h3>
              <ul>
                <li>3–4 колонки на desktop переходять у 1 колонку на phone.</li>
                <li>Висота не має бути фіксованою, якщо текст може змінюватися.</li>
                <li>Кнопки залишаються доступними без hover.</li>
              </ul>
            </article>
            <article className={docsStyles.card}>
              <h3>Typography</h3>
              <ul>
                <li>Великі заголовки через clamp.</li>
                <li>Довгі назви мають мати fallback/short title.</li>
                <li>Line-height описів більший, ніж у заголовків.</li>
              </ul>
            </article>
          </div>
        </DocsSection>

        <DocsSection title="Кодовий принцип">
          <CodeBlock>{`
.title {
  font-size: clamp(2rem, 1rem + 4vw, 5rem);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 820px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
          `}</CodeBlock>
        </DocsSection>
      </div>
    </DocsShell>
  );
}
