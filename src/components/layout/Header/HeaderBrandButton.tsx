"use client";

import styles from "./Header.module.css";

export function HeaderBrandButton() {
  return (
    <button
      type="button"
      className={styles.brandWrap}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      aria-label="Піднятися до початку сторінки"
      title='ІКС "Геоінформаційна система МОУ"'
    >
      <span className={styles.brandMark} aria-hidden="true">
        𝑨
      </span>

      <span className={`${styles.brand} ${styles.brandFull}`}>
        ІКС &quot;Геоінформаційна система МОУ&quot;
      </span>

      <span className={`${styles.brand} ${styles.brandShort}`} aria-hidden="true">
        ІКС ГІС МОУ
      </span>
    </button>
  );
}
