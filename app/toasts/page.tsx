import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";

import { ToastDemo } from "./ToastDemo";

const toastTsx = `"use client";

import { useToast } from "@/components/ui/Toast";

export function SaveButton() {
  const { showToast } = useToast();

  return (
    <button
      type="button"
      onClick={() =>
        showToast({
          type: "warning",
          title: "Перевірте параметри",
          description: "Деякі дані можуть бути неповними або застарілими.",
        })
      }
    >
      Показати попередження
    </button>
  );
}`;

const toastCss = `.viewport {
  position: fixed;
  top: calc(var(--header-height) + var(--space-2));
  right: var(--space-6);
  z-index: 1200;
  width: min(430px, calc(100vw - var(--space-8)));
  display: grid;
  gap: var(--space-3);
  pointer-events: none;
}

.toast {
  min-height: 78px;
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) 36px;
  align-items: center;
  gap: var(--space-4);
  padding: 18px var(--space-4) 18px var(--space-5);
  border: var(--border-width) solid var(--color-border-soft);
  border-left: 3px solid var(--toast-accent);
  background: rgba(1, 1, 2, 0.9);
  color: var(--color-soft-white);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(14px);
  pointer-events: auto;
  animation: toastIn var(--duration-medium) var(--ease-standard) both;
}

.success { --toast-accent: #3fd16f; }
.error { --toast-accent: #f04b4b; }
.info { --toast-accent: #4c9dff; }
.warning { --toast-accent: var(--color-accent); }

.close:hover,
.close:focus-visible {
  border-color: var(--toast-accent);
  transform: scale(1.06) rotate(90deg);
}

@media (max-width: 640px) {
  .viewport {
    right: var(--space-4);
    left: var(--space-4);
    width: auto;
  }
}`;

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

        <DocsSection title="Як зробити кодом">
          <CodeExample tsx={toastTsx} css={toastCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
