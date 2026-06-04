import Link from "next/link";
import { DocsPageHeader, DocsSection, DocsShell, docsStyles } from "@/design-system/DocsShell";

const principles = [
  {
    title: "Абстрактний опис",
    text: "Сторінка не прив’язана до Figma і не описує конкретний макет. Вона пояснює, з яких візуальних частин складається інтерфейс і як ці частини потрібно збирати.",
  },
  {
    title: "Реальні приклади",
    text: "Компоненти показуються через кодові приклади. Це дозволяє перевіряти стилі, responsive-поведінку, стани hover/focus і взаємодію з модалками.",
  },
  {
    title: "Окремі підсторінки",
    text: "Кожна велика частина системи має власний розділ: hero, title section, subsystem section, UI kit, fonts, paddings, buttons, cards, modals, adaptive.",
  },
];

export default function HomePage() {
  return (
    <DocsShell currentHref="/">
      <DocsPageHeader
        eyebrow="00 / Вступ"
        title="Жива дизайн-система для підтримки інтерфейсу порталу"
        description="Це службовий сайт для команди. Він показує, з яких компонентів складається портал, яку роль має кожен блок, як він має виглядати візуально та які правила потрібно зберігати під час розробки нових сторінок."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection
          title="Для чого ця сторінка"
          description="Це не макет і не презентація. Це контрольна документація, яка допомагає не розносити UI в різні боки після кожної нової задачі."
        >
          <div className={docsStyles.grid3}>
            {principles.map((item) => (
              <article key={item.title} className={docsStyles.card}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </DocsSection>

        <DocsSection
          title="Як користуватись"
          description="Зліва знаходиться навігація. Відкриваєш потрібний розділ, дивишся візуальний приклад, читаєш правила, копіюєш або звіряєш кодовий принцип."
        >
          <div className={docsStyles.grid2}>
            <article className={docsStyles.card}>
              <h3>Компонентні розділи</h3>
              <ul>
                <li><Link href="/hero">Hero</Link> — перший екран сторінки.</li>
                <li><Link href="/title-section">Title section</Link> — великий вступний блок.</li>
                <li><Link href="/subsystem-section">Subsystem section</Link> — сітка підсистем.</li>
              </ul>
            </article>

            <article className={docsStyles.card}>
              <h3>UI kit</h3>
              <ul>
                <li><Link href="/ui-kit/fonts">Fonts</Link> — типографіка і ваги.</li>
                <li><Link href="/ui-kit/paddings">Paddings</Link> — ритм і контейнери.</li>
                <li><Link href="/ui-kit/buttons">Buttons</Link> — дії і посилання.</li>
                <li><Link href="/ui-kit/cards">Cards</Link> — картки застосунків і документів.</li>
              </ul>
            </article>
          </div>
        </DocsSection>
      </div>
    </DocsShell>
  );
}
