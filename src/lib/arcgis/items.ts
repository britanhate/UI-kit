import type { ArcgisSourceKind } from "@/config/arcgis-groups";
import { createArcgisFormPostRequest } from "@/lib/arcgis/request";
import { getArcgisCardOverride } from "@/config/arcgis-card-overrides";
import {
  readNumber,
  readOptionalString,
  readRequiredString as readRequiredStringBase,
  readStringArray,
  removeUndefined,
} from "@/lib/common-validators";
import { getServerEnv } from "@/lib/env";
import type {
  SanitizedArcgisGroup,
  SanitizedArcgisItem,
} from "@/lib/arcgis/types";

type FetchArcgisGroupArgs = {
  groupId: string;
  accessToken: string;
};

type FetchArcgisGroupItemsArgs = FetchArcgisGroupArgs & {
  allowedTypes?: string[];
};

type SanitizeArcgisItemArgs = {
  item: ArcgisRawItem;
  kind: ArcgisSourceKind;
};

type ArcgisRawError = {
  code?: number;
  message?: string;
};

type ArcgisRawGroup = {
  id?: unknown;
  title?: unknown;
  description?: unknown;
  snippet?: unknown;
  owner?: unknown;
  access?: unknown;
  tags?: unknown;
  created?: unknown;
  modified?: unknown;
  thumbnail?: unknown;
  url?: unknown;
  error?: ArcgisRawError;
};

type ArcgisRawItem = {
  id?: unknown;
  title?: unknown;
  type?: unknown;
  snippet?: unknown;
  description?: unknown;
  owner?: unknown;
  access?: unknown;
  tags?: unknown;
  created?: unknown;
  modified?: unknown;
  thumbnail?: unknown;
  url?: unknown;
};

type ArcgisGroupItemsResponse = {
  results?: unknown;
  nextStart?: unknown;
  error?: ArcgisRawError;
};

const PAGE_SIZE = 100;
const MAX_ITEMS = 300;

export class ArcgisItemsError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly arcgisCode?: number,
  ) {
    super(message);
    this.name = "ArcgisItemsError";
  }
}

export async function fetchArcgisGroup({
  groupId,
  accessToken,
}: FetchArcgisGroupArgs) {
  const env = getServerEnv();
  const body = new URLSearchParams({
    f: "json",
    token: accessToken,
  });

  const response = await fetch(
    `${env.ARCGIS_PORTAL_URL}/sharing/rest/community/groups/${encodeURIComponent(groupId)}`,
    createArcgisFormPostRequest(body),
  );
  const json = (await response
    .json()
    .catch(() => null)) as ArcgisRawGroup | null;

  if (!response.ok || !json || json.error) {
    throw new ArcgisItemsError(
      "ArcGIS group metadata fetch failed.",
      response.status,
      json?.error?.code,
    );
  }

  return json;
}

export async function fetchArcgisGroupItems({
  groupId,
  accessToken,
  allowedTypes,
}: FetchArcgisGroupItemsArgs) {
  const env = getServerEnv();
  const items: ArcgisRawItem[] = [];
  let start = 1;

  while (start > 0 && items.length < MAX_ITEMS) {
    const body = new URLSearchParams({
      f: "json",
      token: accessToken,
      num: String(Math.min(PAGE_SIZE, MAX_ITEMS - items.length)),
      start: String(start),
      sortField: "modified",
      sortOrder: "desc",
    });

    const response = await fetch(
      `${env.ARCGIS_PORTAL_URL}/sharing/rest/content/groups/${encodeURIComponent(groupId)}/search`,
      createArcgisFormPostRequest(body),
    );
    const json = (await response
      .json()
      .catch(() => null)) as ArcgisGroupItemsResponse | null;

    if (!response.ok || !json || json.error || !Array.isArray(json.results)) {
      throw new ArcgisItemsError(
        "ArcGIS group items fetch failed.",
        response.status,
        json?.error?.code,
      );
    }

    items.push(...json.results.filter(isArcgisRawItem));
    start = readNumber(json.nextStart) ?? -1;
  }

  return filterAllowedTypes(items.slice(0, MAX_ITEMS), allowedTypes);
}

export function sanitizeArcgisGroup(
  group: ArcgisRawGroup,
): SanitizedArcgisGroup {
  const id = readRequiredString(group.id, "ArcGIS group is missing id.");
  const title = readRequiredString(
    group.title,
    "ArcGIS group is missing title.",
  );
  const thumbnail = readOptionalString(group.thumbnail);

  return removeUndefined({
    id,
    title,
    description: readOptionalString(group.description),
    snippet: readOptionalString(group.snippet),
    owner: readOptionalString(group.owner),
    access: readOptionalString(group.access),
    tags: readStringArray(group.tags),
    created: readNumber(group.created),
    modified: readNumber(group.modified),
    thumbnail,
    thumbnailUrl: buildGroupThumbnailUrl(id, thumbnail),
    url: readSafeClientUrl(group.url),
  });
}

export function sanitizeArcgisItem({
  item,
  kind,
}: SanitizeArcgisItemArgs): SanitizedArcgisItem {
  const id = readRequiredString(item.id, "ArcGIS item is missing id.");
  const title = readRequiredString(item.title, "ArcGIS item is missing title.");
  const type = readRequiredString(item.type, "ArcGIS item is missing type.");

  const cardOverride = getArcgisCardOverride(id);
  const thumbnail = readOptionalString(item.thumbnail);
  const itemUrl = readSafeClientUrl(item.url);
  const itemPageUrl = buildItemPageUrl(id);

  return removeUndefined({
    id,
    title,
    type,
    snippet: readOptionalString(item.snippet),
    description: readOptionalString(item.description),
    owner: readOptionalString(item.owner),
    access: readOptionalString(item.access),
    tags: readStringArray(item.tags),
    created: readNumber(item.created),
    modified: readNumber(item.modified),
    thumbnail,
    thumbnailUrl: buildItemThumbnailUrl(id, thumbnail),
    url: itemUrl,
    itemPageUrl,
    openUrl: buildOpenUrl({ id, type, itemUrl, itemPageUrl, kind }),
    downloadUrl: isDownloadableItemType(type)
      ? buildItemDownloadUrl(id)
      : undefined,
    imageUrl: cardOverride?.imageUrl,
    card: cardOverride
      ? removeUndefined({
          title: cardOverride.title,
          description: cardOverride.description,
          imageUrl: cardOverride.imageUrl,
          order: cardOverride.order,
        })
      : undefined,
  });
}

function isDownloadableItemType(type: string) {
  return new Set([
    "PDF",
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
    "Image",
    "iWork Keynote",
    "iWork Numbers",
    "iWork Pages",
    "CSV",
    "File Geodatabase",
    "Shapefile",
    "GeoJson",
    "KML",
    "CAD Drawing",
  ]).has(type);
}

function filterAllowedTypes(items: ArcgisRawItem[], allowedTypes?: string[]) {
  if (!allowedTypes?.length) return items;

  const allowed = new Set(allowedTypes);

  return items.filter((item) => {
    const type = readOptionalString(item.type);

    return Boolean(type && allowed.has(type));
  });
}

function buildOpenUrl({
  id,
  type,
  itemUrl,
  itemPageUrl,
  kind,
}: {
  id: string;
  type: string;
  itemUrl?: string;
  itemPageUrl: string;
  kind: ArcgisSourceKind;
}) {
  if (kind === "documents") return itemPageUrl;

  if (itemUrl) return itemUrl;

  if (type === "Web Experience") {
    return `${getServerEnv().ARCGIS_PORTAL_URL}/apps/experiencebuilder/experience/?id=${encodeURIComponent(id)}`;
  }

  return itemPageUrl;
}

function buildItemPageUrl(itemId: string) {
  return `${getServerEnv().ARCGIS_PORTAL_URL}/home/item.html?id=${encodeURIComponent(itemId)}`;
}

function buildItemDownloadUrl(itemId: string) {
  return `/api/arcgis/items/${encodeURIComponent(itemId)}/download`;
}

function buildItemThumbnailUrl(itemId: string, thumbnail: string | undefined) {
  if (!thumbnail) return undefined;

  return `/api/arcgis/items/${encodeURIComponent(itemId)}/thumbnail?name=${encodeURIComponent(thumbnail)}`;
}

function buildGroupThumbnailUrl(
  groupId: string,
  thumbnail: string | undefined,
) {
  if (!thumbnail) return undefined;

  return `${getServerEnv().ARCGIS_PORTAL_URL}/sharing/rest/community/groups/${encodeURIComponent(groupId)}/info/${encodeURIComponent(thumbnail)}`;
}

function readSafeClientUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;

  try {
    const url = new URL(value.trim());

    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    if (hasClientVisibleToken(url)) return undefined;

    return url.toString();
  } catch {
    return undefined;
  }
}

function hasClientVisibleToken(url: URL) {
  for (const key of url.searchParams.keys()) {
    if (key.toLowerCase().includes("token")) return true;
  }

  return url.hash.toLowerCase().includes("token=");
}

function isArcgisRawItem(value: unknown): value is ArcgisRawItem {
  return (
    Boolean(value && typeof value === "object") &&
    typeof (value as Record<string, unknown>).id === "string" &&
    typeof (value as Record<string, unknown>).title === "string"
  );
}

function readRequiredString(value: unknown, message: string) {
  try {
    return readRequiredStringBase(value, message);
  } catch {
    throw new ArcgisItemsError(message);
  }
}
