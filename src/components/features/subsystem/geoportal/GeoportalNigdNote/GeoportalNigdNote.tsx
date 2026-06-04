import { dataMagnifyingGlass24 } from "@esri/calcite-ui-icons/js/dataMagnifyingGlass24.js";
import { layers24 } from "@esri/calcite-ui-icons/js/layers24.js";
import { portal24 } from "@esri/calcite-ui-icons/js/portal24.js";
import { uploadTo24 } from "@esri/calcite-ui-icons/js/uploadTo24.js";

import styles from "./GeoportalNigdNote.module.css";

type NoteItem = {
  label: string;
  icon: "metadata" | "services" | "catalog" | "integration";
};

const items: NoteItem[] = [
  {
    label: "Метадані",
    icon: "metadata",
  },
  {
    label: "Сервіси",
    icon: "services",
  },
  {
    label: "Каталогізація",
    icon: "catalog",
  },
  {
    label: "Інтеграція",
    icon: "integration",
  },
];

const icons: Record<NoteItem["icon"], string> = {
  metadata: dataMagnifyingGlass24,
  services: layers24,
  catalog: portal24,
  integration: uploadTo24,
};

export function GeoportalNigdNote() {
  return (
    <section className={styles.section} aria-labelledby="geoportal-nigd-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.label}>{"//"} Інтеграція з НІГД</p>

          <h2 id="geoportal-nigd-title">Геопортал як точка представлення геопросторових ресурсів</h2>

          <p>
            Геопортал використовується для представлення геопросторових ресурсів Топографічної служби в контексті
            Національної інфраструктури геопросторових даних.
          </p>
        </div>

        <div className={styles.flow} aria-label="Напрями інтеграції">
          {items.map((item, index) => (
            <div key={item.label} className={styles.flowItem}>
              <span className={styles.flowNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.flowIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d={icons[item.icon]} />
                </svg>
              </span>

              <span className={styles.flowLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
