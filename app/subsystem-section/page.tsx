import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";
import { SubsystemSectionDemo } from "@/design-system/examples/SubsystemSectionDemo";

export default function SubsystemSectionPage() {
  return (
    <DocsShell currentHref="/subsystem-section">
      <DocsPageHeader
        eyebrow="03 / Component"
        title="Subsystem section"
        description="Subsystem section — каталог напрямів або сервісів. Він показує користувачу доступні підсистеми, пояснює різницю між ними і дає стабільну дію для переходу."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Анатомія секції" description="Секція складається з заголовкового блоку і набору великих карток. Картка не повинна бути просто банером — у ній має бути metadata, назва, короткий опис, теги і дія.">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Список</h3><p>Картки читаються як перелік сервісів. Користувач має швидко відрізнити одну підсистему від іншої.</p></article>
            <article className={docsStyles.card}><h3>Зображення</h3><p>Фон підсилює контекст, але не є основним носієм інформації. Текст завжди важливіший.</p></article>
            <article className={docsStyles.card}><h3>Дії</h3><p>Основний перехід має бути однаково розташований у всіх картках.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Приклад у системі">
          <Preview label="Real component" note="PlatformSubsystemsSection" bleed>
            <SubsystemSectionDemo />
          </Preview>
        </DocsSection>

        <DocsSection title="Як зробити кодом">
          <CodeExample
            tsxPath="src/design-system/examples/SubsystemSectionDemo.tsx"
            cssPath={[
              "src/components/features/platform/PlatformSubsystemsSection/PlatformSubsystemsSection.module.css",
              "src/components/features/platform/PlatformSubsystemsSection/PlatformSubsystemCard.module.css",
            ]}
          />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
