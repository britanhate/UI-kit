"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

import styles from "./ToastDemo.module.css";

const examples = [
  {
    type: "info" as const,
    title: "Інформація оновлена",
    description: "Сторінка отримала актуальні дані з сервера.",
  },
  {
    type: "warning" as const,
    title: "Перевірте параметри",
    description: "Деякі дані можуть бути неповними або застарілими.",
  },
  {
    type: "success" as const,
    title: "Дію виконано",
    description: "Зміни успішно збережені у системі.",
  },
  {
    type: "error" as const,
    title: "Не вдалося виконати дію",
    description: "Спробуйте повторити запит або зверніться до адміністратора.",
  },
];

const labels = {
  info: "Інформація",
  warning: "Увага",
  success: "Успішно",
  error: "Помилка",
};

const icons = {
  info: "i",
  warning: "!",
  success: "✓",
  error: "×",
};

export function ToastDemo() {
  const { showToast } = useToast();

  return (
    <div className={styles.demoWrap}>
      <div className={styles.actions}>
        {examples.map((toast) => (
          <Button
            key={toast.type}
            type="button"
            variant={toast.type === "warning" ? "primary" : "secondary"}
            onClick={() => showToast(toast)}
          >
            Показати {labels[toast.type].toLowerCase()}
          </Button>
        ))}
      </div>

      <div className={styles.staticStack} aria-label="Статичні приклади toast">
        {examples.map((toast) => (
          <article key={toast.type} className={`${styles.toastPreview} ${styles[toast.type]}`}>
            <span className={styles.icon} aria-hidden="true">
              {icons[toast.type]}
            </span>
            <div>
              <p className={styles.label}>{labels[toast.type]}</p>
              <h3 className={styles.title}>{toast.title}</h3>
              <p className={styles.description}>{toast.description}</p>
            </div>
            <span className={styles.close} aria-hidden="true">×</span>
          </article>
        ))}
      </div>
    </div>
  );
}
