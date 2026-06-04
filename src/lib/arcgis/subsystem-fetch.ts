import "server-only";

import { headers } from "next/headers";

import type {
  ArcgisSubsystemItemsResponse,
  SanitizedArcgisItem,
} from "@/lib/arcgis/types";
import { getServerEnv } from "@/lib/env";

export class SubsystemItemsFetchError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "SubsystemItemsFetchError";
  }
}

export type SubsystemSlug = "geoportal" | "geospatial";

export async function fetchSubsystemItems(slug: SubsystemSlug) {
  const startedAt = performance.now();
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");

  const response = await fetch(
    `${getServerEnv().APP_BASE_URL}/api/arcgis/subsystems/${slug}/items`,
    {
      headers: cookie ? { cookie } : undefined,
      cache: "no-store",
    },
  );

  logSubsystemFetchTiming({
    action: "subsystem_bff_fetch",
    slug,
    durationMs: Math.round(performance.now() - startedAt),
    statusCode: response.status,
    success: response.ok,
  });

  if (!response.ok) {
    throw new SubsystemItemsFetchError(
      `Failed to fetch ArcGIS subsystem items for ${slug}.`,
      response.status,
    );
  }

  return (await response.json()) as ArcgisSubsystemItemsResponse;
}

function logSubsystemFetchTiming(metadata: {
  action: "subsystem_bff_fetch";
  slug: SubsystemSlug;
  durationMs: number;
  statusCode: number;
  success: boolean;
}) {
  if (process.env.DEBUG_ARCGIS !== "true") return;

  console.info("arcgis_debug", metadata);
}

export function findAppsSection(data: ArcgisSubsystemItemsResponse) {
  return data.sections.find((section) => section.kind === "apps") ?? null;
}

export function getItemCardImage(item: SanitizedArcgisItem) {
  return item.card?.imageUrl || item.imageUrl || item.thumbnailUrl;
}
