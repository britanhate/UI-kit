import { SectionHeader } from "@/components/ui/SectionHeader";

import styles from "./PlatformNoteSection.module.css";

export function PlatformNoteSection() {
  return (
    <section className={styles.section} aria-labelledby="platform-note-title">
      <SectionHeader
        titleId="platform-note-title"
        className={styles.inner}
        size="compact"
        label="// розвиток платформи"
        title="Середовище розширюється новими сервісами"
        description="Перелік підсистем оновлюється відповідно до доступних геопросторових ресурсів, картографічних сервісів та інструментів, інтегрованих у єдине середовище платформи."
      />
    </section>
  );
}
