import styles from "./ToastImplementation.module.css";

type ToastType = "info" | "warning" | "success" | "error";

type ToastMessage = {
  type: ToastType;
  title: string;
  description: string;
};

const examples: ToastMessage[] = [
  {
    type: "info",
    title: "Дані оновлюються",
    description: "Сторінка автоматично підтягне останні зміни після завершення синхронізації.",
  },
  {
    type: "warning",
    title: "Перевірте параметри",
    description: "Деякі дані можуть бути неповними або застарілими.",
  },
  {
    type: "success",
    title: "Зміни збережено",
    description: "Операцію виконано успішно, можна продовжувати роботу.",
  },
  {
    type: "error",
    title: "Не вдалося виконати дію",
    description: "Повторіть спробу або зверніться до адміністратора системи.",
  },
];

const labels: Record<ToastType, string> = {
  info: "Інформація",
  warning: "Попередження",
  success: "Успіх",
  error: "Помилка",
};

const icons: Record<ToastType, string> = {
  info: "i",
  warning: "!",
  success: "✓",
  error: "×",
};

function ToastPreview({ toast }: { toast: ToastMessage }) {
  return (
    <article className={`${styles.toast} ${styles[toast.type]}`}>
      <span className={styles.icon} aria-hidden="true">
        {icons[toast.type]}
      </span>
      <div>
        <p className={styles.label}>{labels[toast.type]}</p>
        <h3 className={styles.title}>{toast.title}</h3>
        <p className={styles.description}>{toast.description}</p>
      </div>
      <span className={styles.close} aria-hidden="true">
        ×
      </span>
    </article>
  );
}

export function ToastImplementationExample() {
  return (
    <div className={styles.demoWrap}>
      <div className={styles.actions}>
        {examples.map((toast) => (
          <button
            key={toast.type}
            className={`${styles.button} ${toast.type === "warning" ? styles.primary : ""}`}
            type="button"
          >
            Показати {labels[toast.type].toLowerCase()}
          </button>
        ))}
      </div>

      <div className={styles.staticStack} aria-label="Статичні приклади toast">
        {examples.map((toast) => (
          <ToastPreview key={toast.type} toast={toast} />
        ))}
      </div>
    </div>
  );
}
