import { subsystemsConfig } from "@/config/subsystems";
import { SectionHeader } from "@/components/ui/SectionHeader";

import { LandingSubsystemCard } from "./LandingSubsystemCard";
import styles from "./SubsystemsSection.module.css";

export function SubsystemsSection() {
  const activeSubsystems = subsystemsConfig
    .filter((item) => item.status === "active")
    .sort((a, b) => a.order - b.order);

  if (activeSubsystems.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="subsystems-title">
      <SectionHeader
        titleId="subsystems-title"
        className={styles.header}
        label="// Підсистеми"
        title="Геоінформаційні підсистеми платформи"
        description="Оберіть необхідну підсистему для доступу до геопросторових ресурсів, сервісів, матеріалів та інструментів."
      />

      <div className={styles.grid} data-count={activeSubsystems.length}>
        {activeSubsystems.map((subsystem, index) => (
          <LandingSubsystemCard
            key={subsystem.slug}
            subsystem={subsystem}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
