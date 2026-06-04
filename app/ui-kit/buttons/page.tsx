import { AccentButton } from "@/components/ui/AccentButton";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CodeExample, DocsPageHeader, DocsSection, DocsShell, Preview, docsStyles } from "@/design-system/DocsShell";

const buttonTsx = `type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
};

export function Button({ children, href, type = "button", variant = "secondary", disabled }: ButtonProps) {
  const className = [styles.button, styles[variant], disabled ? styles.disabled : ""]
    .filter(Boolean)
    .join(" ");

  if (href && !disabled) {
    return <a className={className} href={href}>{children}</a>;
  }

  return <button className={className} type={type} disabled={disabled}>{children}</button>;
}`;

const buttonCss = `.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid var(--color-border-soft);
  border-radius: 0;
  color: var(--color-text);
  background: transparent;
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--tracking-button);
  text-decoration: none;
  cursor: pointer;
  transition:
    border-color var(--duration-fast) var(--ease-standard),
    background var(--duration-fast) var(--ease-standard),
    color var(--duration-fast) var(--ease-standard);
}

.primary {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: #010102;
}

.secondary {
  background: rgba(255, 255, 255, .04);
}

.ghost {
  border-color: transparent;
  background: transparent;
}

.button:hover,
.button:focus-visible {
  border-color: var(--color-accent);
  color: var(--color-text);
  outline: none;
}

.primary:hover,
.primary:focus-visible {
  background: transparent;
}

.disabled,
.button:disabled {
  opacity: .48;
  cursor: not-allowed;
}`;

export default function ButtonsPage() {
  return (
    <DocsShell currentHref="/ui-kit/buttons">
      <DocsPageHeader
        eyebrow="08 / UI kit"
        title="Buttons і links"
        description="Кнопки задають дії інтерфейсу. Вони мають бути прямокутними, контрастними, однаково високими і зрозумілими за пріоритетом: головна дія, другорядна дія, службове посилання."
      />

      <div className={docsStyles.page} style={{ paddingTop: 0 }}>
        <DocsSection title="Варіанти дій" description="Варіант кнопки вибирається за важливістю дії, а не за бажанням зробити блок декоративнішим.">
          <Preview label="Button states">
            <div className={docsStyles.buttonRow}>
              <AccentButton href="#">Accent action</AccentButton>
              <Button type="button" variant="primary">Primary</Button>
              <Button type="button" variant="secondary">Secondary</Button>
              <Button type="button" variant="ghost">Ghost</Button>
              <Button type="button" variant="secondary" disabled>Disabled</Button>
              <Badge variant="accent">Badge</Badge>
            </div>
          </Preview>
        </DocsSection>

        <DocsSection title="Правила використання">
          <div className={docsStyles.grid3}>
            <article className={docsStyles.card}><h3>Accent / Primary</h3><p>Одна головна дія в секції або картці. Не ставити кілька accent-кнопок поруч.</p></article>
            <article className={docsStyles.card}><h3>Secondary</h3><p>Додаткова дія: відкрити, завантажити, переглянути деталі.</p></article>
            <article className={docsStyles.card}><h3>Ghost</h3><p>Низький пріоритет: службові переходи, закриття, нейтральні дії.</p></article>
          </div>
        </DocsSection>

        <DocsSection title="Як зробити кодом" description="Компонент може рендерити або button, або link. Візуальний клас лишається спільним, щоб дія виглядала однаково.">
          <CodeExample tsx={buttonTsx} css={buttonCss} />
        </DocsSection>
      </div>
    </DocsShell>
  );
}
