"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

import type { GeospatialDocumentAction } from "./documentActions";
import styles from "./GeospatialDocumentDownloadAction.module.css";

type DownloadAction = Extract<GeospatialDocumentAction, { type: "download" }>;

type GeospatialDocumentDownloadActionProps = {
  action: DownloadAction;
  className?: string;
};

function getFilenameFromContentDisposition(value: string | null) {
  if (!value) return undefined;

  const encodedFilename = value.match(/filename\*=UTF-8''([^;]+)/i)?.[1];

  if (encodedFilename) {
    try {
      return decodeURIComponent(encodedFilename.trim());
    } catch {
      return encodedFilename.trim();
    }
  }

  const filename = value.match(/filename="?([^";]+)"?/i)?.[1];

  return filename?.trim();
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = filename;
  link.style.display = "none";

  document.body.append(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
}

export function GeospatialDocumentDownloadAction({ action, className }: GeospatialDocumentDownloadActionProps) {
  const isMountedRef = useRef(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  async function handleDownload() {
    setIsDownloading(true);
    setHasError(false);

    try {
      const response = await fetch(action.href, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Document download failed.");
      }

      const blob = await response.blob();
      const filename =
        getFilenameFromContentDisposition(response.headers.get("Content-Disposition")) ?? "arcgis-document";

      triggerBlobDownload(blob, filename);

      showToast({
        type: "success",
        title: "Завантаження розпочато",
        description: "Файл передано браузеру для збереження.",
      });
    } catch {
      if (isMountedRef.current) {
        setHasError(true);

        showToast({
          type: action.fallbackOpenHref ? "warning" : "error",
          title: "Не вдалося завантажити файл",
          description: action.fallbackOpenHref
            ? "Спробуйте відкрити матеріал у Portal."
            : "Повторіть дію пізніше або перевірте доступ до матеріалу.",
        });
      }
    } finally {
      if (isMountedRef.current) {
        setIsDownloading(false);
      }
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.actionRow}>
        <Button
          type="button"
          variant="secondary"
          className={className}
          disabled={isDownloading}
          onClick={handleDownload}
        >
          {isDownloading ? "Завантаження…" : action.label}
        </Button>

        {hasError && action.fallbackOpenHref ? (
          <Button
            href={action.fallbackOpenHref}
            variant="secondary"
            external
            target="_blank"
            rel="noreferrer"
            className={[className, styles.fallbackLink].filter(Boolean).join(" ")}
          >
            Відкрити
          </Button>
        ) : null}
      </div>
    </div>
  );
}
