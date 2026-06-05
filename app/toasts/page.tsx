import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";

import { ToastDemo } from "./ToastDemo";

export default function ToastsPage() {
  return (
    <DocsShell currentHref="/toasts">
      <DocsPageHeader
        eyebrow="11 / Feedback"
        title="Popup toast"
        description="Toast — це коротке системне повідомлення поверх інтерфейсу. Воно не блокує сторінку, але показує результат дії: інформацію, попередження, успіх або помилку."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection
          title="Інтерактивний приклад"
          description="Натисни кнопки, щоб побачити реальний toast у правому верхньому куті. Компонент уже підключений через ToastProvider у layout."
        >
          <Preview label="Toast variants" note="info / warning / success / error">
            <ToastDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Коли використовувати">
          <div className={docsStyles.grid4}>
            <article className={docsStyles.card}>
              <h3>Info</h3>
              <p>Нейтральне повідомлення: дані оновлено, режим змінено, запит обробляється.</p>
            </article>
            <article className={docsStyles.card}>
              <h3>Warning</h3>
              <p>Користувач має звернути увагу, але дія не заблокована. Акцент — помаранчевий.</p>
            </article>
            <article className={docsStyles.card}>
              <h3>Success</h3>
              <p>Дію виконано успішно: збережено, відправлено, створено, оновлено.</p>
            </article>
            <article className={docsStyles.card}>
              <h3>Error</h3>
              <p>Дія не виконалась. Текст має пояснювати, що сталося і що робити далі.</p>
            </article>
          </div>
        </DocsSection>

        <DocsSection title="Правила">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}>
              <h3>Не блокує UI</h3>
              <p>Toast не замінює modal. Він тільки інформує і не вимагає обов’язкової відповіді.</p>
            </article>
            <article className={docsStyles.card}>
              <h3>Короткий текст</h3>
              <p>Title — один рядок. Description — максимум 1–2 короткі речення.</p>
            </article>
            <article className={docsStyles.card}>
              <h3>Не більше 4 одночасно</h3>
              <p>Черга обмежується, щоб повідомлення не перекривали інтерфейс.</p>
            </article>
          </div>
        </DocsSection>

        <DocsSection title="Реалізація компонента">
          <CodeExample
            tsxPath="src/design-system/examples/implementations/ToastImplementation.tsx"
            cssPath="src/design-system/examples/implementations/ToastImplementation.module.css"
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
