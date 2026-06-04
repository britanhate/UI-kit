import type { ArcgisSourceKind, ArcgisSubsystemSlug } from "@/config/arcgis-groups";

export type SanitizedArcgisGroup = {
  id: string;
  title: string;
  description?: string;
  snippet?: string;
  owner?: string;
  access?: string;
  tags?: string[];
  created?: number;
  modified?: number;
  thumbnail?: string;
  thumbnailUrl?: string;
  url?: string;
};

export type SanitizedArcgisItem = {
  id: string;
  title: string;
  type: string;
  snippet?: string;
  description?: string;
  owner?: string;
  access?: string;
  tags?: string[];
  created?: number;
  modified?: number;
  thumbnail?: string;
  thumbnailUrl?: string;
  url?: string;
  itemPageUrl: string;
  openUrl: string;
  downloadUrl?: string;
  imageUrl?: string;
  card?: {
    title?: string;
    description?: string;
    imageUrl?: string;
    order?: number;
  };
};

export type ArcgisSubsystemSection = {
  key: string;
  title: string;
  description: string;
  kind: ArcgisSourceKind;
  group: SanitizedArcgisGroup;
  items: SanitizedArcgisItem[];
};

export type ArcgisSubsystemItemsResponse = {
  subsystem: {
    slug: ArcgisSubsystemSlug;
    title: string;
  };
  sections: ArcgisSubsystemSection[];
};

