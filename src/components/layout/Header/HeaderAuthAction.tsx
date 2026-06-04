"use client";

import { signOut24 } from "@esri/calcite-ui-icons/js/signOut24.js";
import { useState } from "react";

import { useToast } from "@/components/ui/Toast";

import styles from "./HeaderAuthAction.module.css";

export type HeaderUser = {
  username: string;
  fullName: string;
  id: string;
  email?: string;
  role?: string;
};

type LogoutResponse = {
  ok: true;
  logoutUrl?: string;
};

type HeaderAuthActionProps = {
  user: HeaderUser | null;
};

const LOGIN_HREF = "/api/auth/portal-login?returnTo=/platform";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function parseLogoutResponse(value: unknown): LogoutResponse | null {
  if (!isRecord(value) || value.ok !== true) {
    return null;
  }

  return {
    ok: true,
    ...(isString(value.logoutUrl) ? { logoutUrl: value.logoutUrl } : {}),
  };
}

function getLogoutErrorMessage(errorCode: string) {
  if (errorCode === "FORBIDDEN") {
    return "Запит не пройшов перевірку безпеки. Оновіть сторінку та спробуйте ще раз.";
  }

  if (errorCode === "INVALID_CONTENT_TYPE") {
    return "Некоректний формат запиту. Оновіть сторінку та повторіть дію.";
  }

  return `${errorCode}. Спробуйте ще раз.`;
}

export function HeaderAuthAction({ user }: HeaderAuthActionProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { showToast } = useToast();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorCode =
          isRecord(errorData) && isString(errorData.error)
            ? errorData.error
            : "Невідома помилка при виході";

        showToast({
          type: "error",
          title: "Не вдалося вийти із системи",
          description: getLogoutErrorMessage(errorCode),
        });

        setIsLoggingOut(false);
        return;
      }

      const parsed = parseLogoutResponse(
        await response.json().catch(() => null),
      );

      if (parsed?.logoutUrl) {
        window.location.assign(parsed.logoutUrl);
        return;
      }

      window.location.assign("/");
    } catch {
      showToast({
        type: "error",
        title: "Помилка мережі",
        description: "Перевірте з'єднання та спробуйте ще раз.",
      });

      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <a
        className={`${styles.root} ${styles.interactiveRoot}`}
        href={LOGIN_HREF}
      >
        <span className={styles.actionText}>Увійти</span>
      </a>
    );
  }

  const displayName = user.fullName || user.username;

  return (
    <button
      type="button"
      className={`${styles.root} ${styles.authenticatedRoot} ${styles.logoutRoot}`}
      onClick={handleLogout}
      disabled={isLoggingOut}
      aria-label="Вийти з облікового запису"
      aria-busy={isLoggingOut}
      title="Вийти"
    >
      <span className={styles.userGroup}>
        <span className={styles.userName} title={displayName}>
          {displayName}
        </span>

        <span className={styles.logoutIconWrap} aria-hidden="true">
          <svg
            className={styles.logoutIcon}
            viewBox="0 0 24 24"
            focusable="false"
          >
            <path d={signOut24} />
          </svg>
        </span>
      </span>
    </button>
  );
}