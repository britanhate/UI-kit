"use client";

import { useEffect, useMemo, useState } from "react";

import { Dialog, DialogCloseButton, DialogHeader } from "@/components/ui/Dialog";
import type { SanitizedArcgisItem } from "@/lib/arcgis/types";
import { stripHtmlToText } from "@/lib/text/html";
import { getPrimaryDocumentAction } from "../documentActions";
import { GeospatialDocumentsList } from "./GeospatialDocumentsList";
import { GeospatialDocumentsToolbar } from "./GeospatialDocumentsToolbar";
import styles from "./GeospatialDocumentsGallery.module.css";

type GeospatialDocumentsGalleryProps = {
  title: string;
  description: string;
  items: SanitizedArcgisItem[];
  onClose: () => void;
};

const dateFormatter = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatItemDate(item: SanitizedArcgisItem) {
  const timestamp = item.modified ?? item.created;

  if (!timestamp) return undefined;

  return dateFormatter.format(new Date(timestamp));
}

function getItemSummary(item: SanitizedArcgisItem) {
  const source = item.card?.description || item.snippet || item.description;

  if (!source) {
    return "Опис матеріалу буде доступний після оновлення метаданих елемента в ArcGIS Enterprise.";
  }

  return stripHtmlToText(source);
}

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function useDebouncedValue(value: string, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [delayMs, value]);

  return debouncedValue;
}

export function GeospatialDocumentsGallery({ title, description, items, onClose }: GeospatialDocumentsGalleryProps) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const debouncedQuery = useDebouncedValue(query, 180);

  const preparedItems = useMemo(() => {
    return items.map((item) => ({
      item,
      itemDate: formatItemDate(item),
      summary: getItemSummary(item),
      action: getPrimaryDocumentAction(item),
      searchableText: [
        item.title,
        item.card?.title,
        item.snippet,
        item.description,
        item.card?.description,
        item.type,
        item.owner,
        ...(item.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
    }));
  }, [items]);

  const itemTypes = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.type).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b, "uk"),
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(debouncedQuery);

    return preparedItems.filter(({ item, searchableText }) => {
      const matchesType = selectedType === "all" || item.type === selectedType;

      if (!matchesType) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return searchableText.includes(normalizedQuery);
    });
  }, [debouncedQuery, preparedItems, selectedType]);

  return (
    <Dialog
      onClose={onClose}
      titleId="geospatial-gallery-title"
      overlayClassName={styles.overlay}
      panelClassName={styles.modal}
    >
      <DialogHeader className={styles.header}>
        <div>
          <p className={styles.label}>Галерея матеріалів</p>

          <h2 id="geospatial-gallery-title">{title}</h2>

          <p>{description}</p>
        </div>

        <DialogCloseButton label="Закрити галерею" onClick={onClose} />
      </DialogHeader>

      <GeospatialDocumentsToolbar
        query={query}
        selectedType={selectedType}
        itemTypes={itemTypes}
        filteredCount={filteredItems.length}
        totalCount={items.length}
        onQueryChange={setQuery}
        onTypeChange={setSelectedType}
      />

      <GeospatialDocumentsList items={filteredItems} />
    </Dialog>
  );
}
