import styles from "./TypographyDemo.module.css";

export function TypographyDemo() {
  return (
    <div className={styles.grid}>
      <article className={styles.card}>
        <h3 className={styles.heroTitle}>Hero title</h3>
        <p>Для першого екрана і великих акцентних блоків.</p>
      </article>
      <article className={styles.card}>
        <h3 className={styles.sectionTitle}>Section title</h3>
        <p>Для назв секцій і службових сторінок.</p>
      </article>
      <article className={styles.card}>
        <h3 className={styles.eyebrow}>Eyebrow</h3>
        <p>Для коротких label-рядків перед заголовком.</p>
      </article>
    </div>
  );
}
