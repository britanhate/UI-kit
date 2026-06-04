import { FooterContactAction } from "./FooterContactAction";
import { footerBrand, footerLegal, footerLinks } from "./footer.config";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} data-scroll-top-footer>
      <div className={styles.footerTopRow}>
        <div className={`${styles.footerContainer} ${styles.footerTopInner}`}>
          <p className={styles.footerBrandLine}>
            <span className={styles.footerMark} aria-hidden="true">
              {footerBrand.mark}
            </span>
            <span>{footerBrand.title}</span>
          </p>
        </div>

        <FooterContactAction />
      </div>

      <div className={`${styles.footerContainer} ${styles.footerBottomRow}`}>
        <p className={styles.footerLegal}>
          {footerLegal.prefix}{" "}
          <a
            href={footerLegal.licenseHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLicenseLink}
          >
            {footerLegal.licenseLabel}
          </a>
          {footerLegal.suffix}
        </p>

        <div className={styles.footerExternalLinks}>
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.ariaLabel}
            >
              <span className={styles.externalLinkIcon} aria-hidden="true">
                ⦿
              </span>
              <span className={styles.externalLinkText}>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}