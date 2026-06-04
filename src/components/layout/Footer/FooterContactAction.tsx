"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";

import { ContactModal } from "./ContactModal";
import { footerContacts, type FooterVariant } from "./footer.config";
import styles from "./Footer.module.css";

function getFooterVariant(pathname: string | null): FooterVariant {
  if (pathname === "/platform" || pathname?.startsWith("/platform/")) {
    return "platform";
  }

  return "landing";
}

export function FooterContactAction() {
  const pathname = usePathname();

  return (
    <FooterContactActionContent
      key={pathname ?? "unknown"}
      pathname={pathname}
    />
  );
}

type FooterContactActionContentProps = {
  pathname: string | null;
};

function FooterContactActionContent({
  pathname,
}: FooterContactActionContentProps) {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const closeContacts = useCallback(() => setIsContactsOpen(false), []);
  const footerVariant = getFooterVariant(pathname);
  const contacts = footerContacts[footerVariant];

  return (
    <>
      <button
        type="button"
        className={styles.footerContactButton}
        onClick={() => setIsContactsOpen(true)}
      >
        <span className={styles.footerContactText}>Контакти</span>
      </button>

      {isContactsOpen ? (
        <ContactModal contacts={contacts} onClose={closeContacts} />
      ) : null}
    </>
  );
}
