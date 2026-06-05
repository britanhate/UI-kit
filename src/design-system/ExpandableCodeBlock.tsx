import styles from "./ExpandableCodeBlock.module.css";

type ExpandableCodeBlockProps = Readonly<{
  children: string;
}>;

export function ExpandableCodeBlock({ children }: ExpandableCodeBlockProps) {
  return (
    <pre className={styles.code} data-lenis-prevent>
      <code>{children.trim()}</code>
    </pre>
  );
}
