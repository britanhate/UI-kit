import type { CSSProperties } from "react";

import { spacingTokens } from "@/design-system/demoData";

import styles from "./SpacingDemo.module.css";

function pxNumber(value: string) {
  return Number(value.replace("px", ""));
}

export function SpacingDemo() {
  return (
    <div className={styles.scale}>
      {spacingTokens.map(([name, value]) => (
        <div key={name} className={styles.row}>
          <strong>{name}</strong>
          <span
            className={styles.bar}
            style={{ "--bar-width": `${pxNumber(value) * 3}px` } as CSSProperties}
          />
          <code>{value}</code>
        </div>
      ))}
    </div>
  );
}
