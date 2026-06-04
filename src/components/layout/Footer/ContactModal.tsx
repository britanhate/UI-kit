"use client";

import { useId, type ReactNode } from "react";

import { Dialog, DialogBody, DialogCloseButton, DialogHeader } from "@/components/ui/Dialog";

import type { FooterContactConfig } from "./footer.config";
import styles from "./ContactModal.module.css";

type ContactModalProps = {
  contacts: FooterContactConfig;
  onClose: () => void;
};

type ContactRowProps = {
  label: string;
  values: string[];
  createHref: (value: string) => string;
  icon: ReactNode;
};

function createPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function ContactRow({ label, values, createHref, icon }: ContactRowProps) {
  if (values.length === 0) return null;

  return (
    <div className={styles.modalContactRow}>
      <dt className={styles.modalTerm}>
        <span className={styles.modalIcon} aria-hidden="true">
          {icon}
        </span>

        <span>{label}</span>
      </dt>

      <dd className={styles.modalValue}>
        {values.map((value) => (
          <a key={value} href={createHref(value)}>
            {value}
          </a>
        ))}
      </dd>
    </div>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 3.5c4.97 0 9 3.52 9 7.86 0 4.35-4.03 7.87-9 7.87-.56 0-1.1-.04-1.62-.14l-3.86 1.8.95-3.24C5.35 16.2 3 13.96 3 11.36 3 7.02 7.03 3.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactModal({ contacts, onClose }: ContactModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Dialog
      onClose={onClose}
      titleId={titleId}
      descriptionId={contacts.description ? descriptionId : undefined}
      panelClassName={styles.modal}
      overlayClassName={styles.modalOverlay}
    >
      <DialogHeader className={styles.modalHeader}>
        <div>
          <p className={styles.modalEyebrow}>Зворотний зв’язок</p>

          <h2 id={titleId} className={styles.modalTitle}>
            {contacts.title}
          </h2>

          {contacts.description ? (
            <p id={descriptionId} className={styles.modalDescription}>
              {contacts.description}
            </p>
          ) : null}
        </div>

        <DialogCloseButton label="Закрити контакти" onClick={onClose} />
      </DialogHeader>

      <DialogBody className={styles.modalBody}>
        <div className={styles.contactGroups}>
          {contacts.groups.map((group) => (
            <section
              key={group.title}
              className={styles.contactGroup}
              aria-labelledby={`contact-group-${group.title}`}
            >
              <div className={styles.groupHeader}>
                <h3 id={`contact-group-${group.title}`}>{group.title}</h3>

                {group.description ? <p>{group.description}</p> : null}
              </div>

              <dl className={styles.modalContactsList}>
                <ContactRow
                  label="Email"
                  values={group.emails}
                  createHref={(email) => `mailto:${email}`}
                  icon={<EmailIcon />}
                />

                <ContactRow
                  label="Signal"
                  values={group.phones}
                  createHref={createPhoneHref}
                  icon={<SignalIcon />}
                />
              </dl>
            </section>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  );
}
