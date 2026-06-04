"use client";

import { useId, useState } from "react";
import { signOut24 } from "@esri/calcite-ui-icons/js/signOut24.js";

import { Dialog, DialogBody, DialogCloseButton, DialogHeader } from "@/components/ui/Dialog";
import { HeaderBrandButton } from "@/components/layout/Header/HeaderBrandButton";
import { HeaderShell } from "@/components/layout/Header/HeaderShell";
import headerStyles from "@/components/layout/Header/Header.module.css";
import actionStyles from "@/components/layout/Header/HeaderAuthAction.module.css";
import styles from "./DesignSystemHeader.module.css";

function ProfileModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Dialog
      onClose={onClose}
      titleId={titleId}
      descriptionId={descriptionId}
      panelClassName={styles.modal}
      overlayClassName={styles.overlay}
    >
      <DialogHeader className={styles.modalHeader}>
        <div>
          <p className={styles.eyebrow}>Обліковий запис</p>
          <h2 id={titleId} className={styles.title}>Bohdan Pishcholin</h2>
          <p id={descriptionId} className={styles.description}>
            Демонстраційний authenticated-state для living design system. Візуально повторює верхню панель порталу.
          </p>
        </div>

        <DialogCloseButton label="Закрити профіль" onClick={onClose} />
      </DialogHeader>

      <DialogBody className={styles.body}>
        <dl className={styles.profileList}>
          <div>
            <dt>Username</dt>
            <dd>pishcholinb</dd>
          </div>
          <div>
            <dt>Стан</dt>
            <dd>Авторизований користувач</dd>
          </div>
          <div>
            <dt>Поведінка у порталі</dt>
            <dd>У production-версії ця зона відповідає за auth action / logout.</dd>
          </div>
        </dl>
      </DialogBody>
    </Dialog>
  );
}

function HeaderProfileAction() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${actionStyles.root} ${actionStyles.authenticatedRoot} ${actionStyles.logoutRoot}`}
        onClick={() => setIsOpen(true)}
        aria-label="Відкрити дані користувача"
        title="Профіль користувача"
      >
        <span className={actionStyles.userGroup}>
          <span className={actionStyles.userName} title="Bohdan Pishcholin">
            Bohdan Pishcholin
          </span>

          <span className={actionStyles.logoutIconWrap} aria-hidden="true">
            <svg className={actionStyles.logoutIcon} viewBox="0 0 24 24" focusable="false">
              <path d={signOut24} />
            </svg>
          </span>
        </span>
      </button>

      {isOpen ? <ProfileModal onClose={() => setIsOpen(false)} /> : null}
    </>
  );
}

export function DesignSystemHeader() {
  return (
    <HeaderShell>
      <nav className={headerStyles.navRow} aria-label="Головна навігація">
        <HeaderBrandButton />
        <HeaderProfileAction />
      </nav>
    </HeaderShell>
  );
}
