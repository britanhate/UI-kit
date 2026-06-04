import type { SanitizedArcgisItem } from "@/lib/arcgis/types";

export type GeospatialDocumentAction =
  | {
      type: "download";
      label: "Завантажити";
      href: string;
      fallbackOpenHref?: string;
    }
  | {
      type: "open";
      label: "Відкрити";
      href: string;
    }
  | {
      type: "disabled";
      label: "Недоступно";
    };

export function canDownloadItem(item: SanitizedArcgisItem) {
  return Boolean(item.downloadUrl || item.id);
}

function getDownloadHref(item: SanitizedArcgisItem) {
  if (item.downloadUrl) return item.downloadUrl;
  if (!item.id) return undefined;

  return `/api/arcgis/items/${encodeURIComponent(item.id)}/download`;
}

function getOpenHref(item: SanitizedArcgisItem) {
  return item.openUrl || item.url || item.itemPageUrl;
}

export function getPrimaryDocumentAction(
  item: SanitizedArcgisItem,
): GeospatialDocumentAction {
  const downloadHref = getDownloadHref(item);

  if (canDownloadItem(item) && downloadHref) {
    return {
      type: "download",
      label: "Завантажити",
      href: downloadHref,
      fallbackOpenHref: getOpenHref(item),
    };
  }

  const openHref = getOpenHref(item);

  if (openHref) {
    return {
      type: "open",
      label: "Відкрити",
      href: openHref,
    };
  }

  return {
    type: "disabled",
    label: "Недоступно",
  };
}
