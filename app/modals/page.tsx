import { CodeExample, DocsPageHeader, DocsSection, DocsShell, docsStyles, Preview } from "@/design-system/DocsShell";

import { ModalDemo } from "./ModalDemo";

export default function ModalsPage() {
  return (
    <DocsShell currentHref="/modals">
      <DocsPageHeader
        eyebrow="10 / Behavior"
        title="Modals"
        description="Модалка — це поверхневий шар для контактів, деталей, підтверджень, помилок або коротких форм. У порталі вона світла: біла панель, чіткий header, затемнений backdrop і кнопка закриття з анімацією."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection
          title="Реальний приклад"
          description="Це не темний mockup. Приклад використовує реальний Dialog-компонент: createPortal, body scroll lock, Escape, backdrop close, dialog semantics і animated close button."
        >
          <Preview label="Interactive light modal" note="Натисни кнопку всередині preview">
            <ModalDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Візуальна логіка">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}>
              <h3>Світла панель</h3>
              <p>Основна panel біла. Темний overlay потрібен тільки для відділення модалки від сторінки.</p>
            </article>
            <article className={docsStyles.card}>
              <h3>Close button</h3>
              <p>Кнопка закриття завжди у правому верхньому куті. На hover/focus повертається на 90 градусів.</p>
            </article>
            <article className={docsStyles.card}>
              <h3>Mobile</h3>
              <p>На малих екранах модалка займає всю ширину, без зайвих зовнішніх полів і з safe-area padding.</p>
            </article>
          </div>
        </DocsSection>

        <DocsSection title="Що обов’язково має бути в коді">
          <div className={docsStyles.grid2}>
            <article className={docsStyles.card}>
              <h3>Поведінка</h3>
              <ul>
                <li>render через portal у <code>document.body</code>;</li>
                <li>блокування scroll body;</li>
                <li>закриття через Escape;</li>
                <li>закриття через backdrop як додатковий спосіб;</li>
                <li>постійна видима close button.</li>
              </ul>
            </article>
            <article className={docsStyles.card}>
              <h3>Структура</h3>
              <ul>
                <li><code>Dialog</code> — overlay і panel;</li>
                <li><code>DialogHeader</code> — eyebrow, title, description, close;</li>
                <li><code>DialogBody</code> — контент, картки, форма або повідомлення;</li>
                <li><code>DialogFooter</code> — тільки якщо потрібні дії.</li>
              </ul>
            </article>
          </div>
        </DocsSection>

        <DocsSection title="Реалізація компонента">
          <CodeExample
            tsxPath="src/design-system/examples/implementations/ModalImplementation.tsx"
            cssPath="src/design-system/examples/implementations/ModalImplementation.module.css"
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
