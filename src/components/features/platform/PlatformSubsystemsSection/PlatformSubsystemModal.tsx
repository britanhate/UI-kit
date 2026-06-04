"use client";

import { useId } from "react";

import { Dialog, DialogBody, DialogCloseButton, DialogHeader } from "@/components/ui/Dialog";
import type { SubsystemConfig } from "@/config/subsystems";

import styles from "./PlatformSubsystemModal.module.css";

type PlatformSubsystemModalProps = {
  subsystem: SubsystemConfig;
  onClose: () => void;
};

export function PlatformSubsystemModal({ subsystem, onClose }: PlatformSubsystemModalProps) {
  const titleId = useId();

  return (
    <Dialog
      onClose={onClose}
      titleId={titleId}
      overlayClassName={styles.modalOverlay}
      panelClassName={styles.modal}
    >
      <DialogHeader className={styles.modalHeader}>
        <div>
          <p className={styles.modalLabel}>Підсистема</p>

          <h2 id={titleId} className={styles.modalTitle}>
            {subsystem.title}
          </h2>
        </div>

        <DialogCloseButton label="Закрити опис підсистеми" onClick={onClose} />
      </DialogHeader>

      <DialogBody className={styles.modalBody}>
        <div className={styles.modalContent}>
          <p className={styles.modalDescription}>{subsystem.detailsDescription}</p>

          {subsystem.tags.length > 0 ? (
            <div className={styles.modalFeatures}>
              <p className={styles.modalFeaturesTitle}>Основні можливості</p>

              <ul>
                {subsystem.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </DialogBody>
    </Dialog>
  );
}
