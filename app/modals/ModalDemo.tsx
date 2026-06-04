"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog, DialogBody, DialogCloseButton, DialogHeader } from "@/components/ui/Dialog";

import styles from "./ModalDemo.module.css";

export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <div className={styles.demoSurface}>
      <div className={styles.demoCard}>
        <p className={styles.demoEyebrow}>Interactive example</p>
        <h2 className={styles.demoTitle}>Світла модалка як у порталі</h2>
        <p className={styles.demoText}>
          Приклад використовує реальний Dialog: portal у document.body, scroll lock,
          Escape, backdrop close і кнопку закриття з анімацією повороту.
        </p>
        <Button type="button" variant="primary" onClick={() => setIsOpen(true)}>
          Відкрити модалку
        </Button>
      </div>

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
              <p className={styles.modalEyebrow}>Приклад компонента</p>
              <h2 id={titleId} className={styles.modalTitle}>
                Стандартне модальне вікно
              </h2>
              <p id={descriptionId} className={styles.modalDescription}>
                Модалка світла, з чітким header, окремою body-зоною і фоновим
                зображенням під білим напівпрозорим шаром.
              </p>
            </div>

            <DialogCloseButton
              label="Закрити приклад модалки"
              onClick={() => setIsOpen(false)}
            />
          </DialogHeader>

          <DialogBody className={styles.modalBody}>
            <div className={styles.modalGrid}>
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
          </DialogBody>
        </Dialog>
      ) : null}
    </div>
  );
}
