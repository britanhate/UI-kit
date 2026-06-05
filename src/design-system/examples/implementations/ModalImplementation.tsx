"use client";

import { useId, useState } from "react";

import styles from "./ModalImplementation.module.css";

type ModalProps = {
  titleId: string;
  descriptionId: string;
  onClose: () => void;
};

function Modal({ titleId, descriptionId, onClose }: ModalProps) {
  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <p className={styles.modalEyebrow}>Приклад компонента</p>
            <h2 id={titleId} className={styles.modalTitle}>
              Стандартне модальне вікно
            </h2>
            <p id={descriptionId} className={styles.modalDescription}>
              Модалка світла, з чітким header, окремою body-зоною і фоновим
              зображенням під білим напівпрозорим шаром.
            </p>
          </div>

          <button className={styles.closeButton} type="button" onClick={onClose}>
            ×
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.grid}>
            <article className={styles.infoCard}>
              <h3>Header</h3>
              <p>Містить eyebrow, title, optional description і постійну close button.</p>
            </article>
            <article className={styles.infoCard}>
              <h3>Body</h3>
              <p>Може містити картки, форми, контакти або повідомлення про помилку.</p>
            </article>
            <article className={styles.infoCard}>
              <h3>Close animation</h3>
              <p>Кнопка закриття на hover/focus повертається на 90 градусів.</p>
            </article>
            <article className={styles.infoCard}>
              <h3>Mobile</h3>
              <p>На телефоні модалка притискається до низу або займає всю висоту.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ModalImplementationExample() {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <div className={styles.demoSurface}>
      <div className={styles.demoCard}>
        <p className={styles.demoEyebrow}>Interactive example</p>
        <h2 className={styles.demoTitle}>Світла модалка як у порталі</h2>
        <p className={styles.demoText}>
          Приклад показує overlay, dialog semantics, backdrop close і кнопку
          закриття з анімацією повороту.
        </p>
        <button className={styles.trigger} type="button" onClick={() => setIsOpen(true)}>
          Відкрити модалку
        </button>
      </div>

      {isOpen ? (
        <Modal
          titleId={titleId}
          descriptionId={descriptionId}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </div>
  );
}
