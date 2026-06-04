import { CodeExample, DocsPageHeader, DocsSection, DocsShell, docsStyles, Preview } from "@/design-system/DocsShell";

import { ModalDemo } from "./ModalDemo";

const modalTsx = `"use client";

import { useId, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
} from "@/components/ui/Dialog";

export function ExampleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Відкрити модалку
      </button>

      {isOpen ? (
        <Dialog
          onClose={() => setIsOpen(false)}
          titleId={titleId}
          descriptionId={descriptionId}
          overlayClassName={styles.modalOverlay}
          panelClassName={styles.modal}
        >
          <DialogHeader className={styles.modalHeader}>
            <div>
              <p className={styles.modalEyebrow}>Приклад</p>
              <h2 id={titleId} className={styles.modalTitle}>
                Назва модального вікна
              </h2>
              <p id={descriptionId} className={styles.modalDescription}>
                Коротке пояснення дії або змісту.
              </p>
            </div>

            <DialogCloseButton
              label="Закрити модальне вікно"
              onClick={() => setIsOpen(false)}
            />
          </DialogHeader>

          <DialogBody className={styles.modalBody}>
            <div className={styles.modalGrid}>
              <article className={styles.infoCard}>...</article>
              <article className={styles.infoCard}>...</article>
            </div>
          </DialogBody>
        </Dialog>
      ) : null}
    </>
  );
}`;

const modalCss = `.modalOverlay {
  --dialog-width: 780px;
  --dialog-overlay-bg: rgba(1, 1, 2, 0.58);
  --dialog-overlay-filter: blur(10px);
}

.modal {
  --dialog-max-height: 860px;
  --dialog-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
}

.modalHeader {
  align-items: center;
}

.modalEyebrow {
  margin: 0 0 var(--space-2);
  color: rgba(18, 34, 56, 0.64);
  font-family: var(--font-standart), system-ui, sans-serif;
  font-size: 0.72rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.modalTitle {
  margin: 0;
  color: var(--color-ink);
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 1.2vw + 1rem, 1.75rem);
  font-weight: var(--font-weight-semibold);
  line-height: 1.15;
}

.modalDescription {
  max-width: 620px;
  margin: var(--space-3) 0 0;
  color: rgba(18, 34, 56, 0.74);
  font-size: 0.96rem;
  line-height: var(--leading-body);
}

.modalBody {
  overflow: auto;
  padding: var(--space-7) var(--space-6) 30px;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.74)),
    url("/images/contact-modal.webp");
  background-size: cover;
  background-position: center;
  color: var(--color-ink);
}

.infoCard {
  padding: 18px;
  border: var(--border-width) solid var(--color-alpha-soft);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 8px 24px rgba(18, 34, 56, 0.08);
}

/* Real close button animation lives in Dialog.module.css */
.closeButton:hover,
.closeButton:focus-visible {
  transform: scale(1.08) rotate(90deg);
}`;

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

        <DocsSection title="Як зробити кодом">
          <CodeExample tsx={modalTsx} css={modalCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
