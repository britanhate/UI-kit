import { subsystemsConfig } from "@/config/subsystems";
import { SectionHeader } from "@/components/ui/SectionHeader";

import { PlatformSubsystemCard } from "./PlatformSubsystemCard";
import styles from "./PlatformSubsystemsSection.module.css";

export function PlatformSubsystemsSection() {
  const activeSubsystems = subsystemsConfig
    .filter((item) => item.status === "active")
    .sort((a, b) => a.order - b.order);

  if (activeSubsystems.length === 0) {
    return null;
  }

  return (
    <section id="platform-subsystems" className={styles.section} aria-labelledby="platform-subsystems-title">
      <SectionHeader
        titleId="platform-subsystems-title"
        className={styles.header}
        label="// Підсистеми"
        title="Геоінформаційні підсистеми платформи"
        description="Оберіть необхідний напрям роботи для доступу до картографічних сервісів, геопросторових матеріалів та супровідних ресурсів."
      />

      <div className={styles.cards}>
        {activeSubsystems.map((subsystem, index) => (
          <PlatformSubsystemCard key={subsystem.slug} subsystem={subsystem} index={index} />
        ))}
      </div>
    </section>
  );
}
