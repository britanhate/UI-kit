"use client";

import { useState } from "react";

import type { SanitizedArcgisItem } from "@/lib/arcgis/types";

import { GeospatialDocumentsGallery } from "../GeospatialDocumentsGallery";
import styles from "./GeospatialDocumentsSection.module.css";

type GeospatialDocumentsGalleryActionProps = {
  title: string;
  description: string;
  items: SanitizedArcgisItem[];
};

export function GeospatialDocumentsGalleryAction({
  title,
  description,
  items,
}: GeospatialDocumentsGalleryActionProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      <button
        className={styles.galleryButton}
        type="button"
        onClick={() => setIsGalleryOpen(true)}
      >
        Галерея
      </button>

      {isGalleryOpen ? (
        <GeospatialDocumentsGallery
          title={title}
          description={description}
          items={items}
          onClose={() => setIsGalleryOpen(false)}
        />
      ) : null}
    </>
  );
}