"use client";

import { checkCircle24 } from "@esri/calcite-ui-icons/js/checkCircle24.js";
import { exclamationMarkTriangle24 } from "@esri/calcite-ui-icons/js/exclamationMarkTriangle24.js";
import { information24 } from "@esri/calcite-ui-icons/js/information24.js";
import { xCircle24 } from "@esri/calcite-ui-icons/js/xCircle24.js";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import styles from "./ToastProvider.module.css";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
};

type ToastInput = {
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
};

type ToastContextValue = {
  showToast: (toast: ToastInput) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 5200;
const MAX_TOASTS = 4;

const toastLabels: Record<ToastType, string> = {
  success: "Успішно",
  error: "Помилка",
  info: "Інформація",
  warning: "Увага",
};

const toastIcons: Record<ToastType, string> = {
  success: checkCircle24,
  error: xCircle24,
  info: information24,
  warning: exclamationMarkTriangle24,
};

function createToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      type = "info",
      title,
      description,
      duration = DEFAULT_DURATION,
    }: ToastInput) => {
      const id = createToastId();

      setToasts((current) =>
        [
          {
            id,
            type,
            title,
            description,
          },
          ...current,
        ].slice(0, MAX_TOASTS),
      );

      window.setTimeout(() => {
        dismissToast(id);
      }, duration);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className={styles.viewport}
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[toast.type]}`}
            role={toast.type === "error" ? "alert" : "status"}
          >
            <span className={styles.icon} aria-hidden="true">
              <svg
                className={styles.iconSvg}
                viewBox="0 0 24 24"
                focusable="false"
              >
                <path d={toastIcons[toast.type]} />
              </svg>
            </span>

            <div className={styles.content}>
              <p className={styles.label}>{toastLabels[toast.type]}</p>

              <p className={styles.title}>{toast.title}</p>

              {toast.description ? (
                <p className={styles.description}>{toast.description}</p>
              ) : null}
            </div>

            <button
              type="button"
              className={styles.close}
              aria-label="Закрити повідомлення"
              onClick={() => dismissToast(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}