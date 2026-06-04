import { getArcgisGroupsEnv } from "@/lib/env";

export type ArcgisSubsystemSlug = "geoportal" | "geospatial";

export type ArcgisSourceKind = "apps" | "documents";

export type ArcgisSubsystemSource = {
  key: string;
  title: string;
  description: string;
  groupId: string;
  kind: ArcgisSourceKind;
  allowedTypes?: string[];
};

export type ArcgisSubsystemGroupConfig = {
  slug: ArcgisSubsystemSlug;
  title: string;
  sources: ArcgisSubsystemSource[];
};

const ARCGIS_SUBSYSTEM_SLUGS = [
  "geoportal",
  "geospatial",
] as const satisfies readonly ArcgisSubsystemSlug[];

export function isArcgisSubsystemSlug(
  value: string,
): value is ArcgisSubsystemSlug {
  return ARCGIS_SUBSYSTEM_SLUGS.includes(value as ArcgisSubsystemSlug);
}

export function getArcgisSubsystemConfigs(): ArcgisSubsystemGroupConfig[] {
  const env = getArcgisGroupsEnv();

  return [
    {
      slug: "geoportal",
      title: "Геопортал МОУ",
      sources: [
        {
          key: "apps",
          title: "Геопросторові сервіси",
          description:
            "Каталог застосунків геопорталу для оперативної роботи з геопросторовими матеріалами.",
          groupId: env.ARCGIS_GEOPORTAL_APPS_GROUP_ID,
          kind: "apps",
          // allowedTypes: [""],
        },
      ],
    },
    {
      slug: "geospatial",
      title: "Геопросторова підтримка",
      sources: [
        {
          key: "apps",
          title: "Оперативні веб-застосунки",
          description:
            "Добірка веб-застосунків для роботи з картографічними сервісами, аналітичними матеріалами та геопросторовими даними.",
          groupId: env.ARCGIS_GEOSPATIAL_APPS_GROUP_ID,
          kind: "apps",
          // allowedTypes: ["Web Experience", "Web Mapping Application", "Dashboard"],
        },
        {
          key: "docs",
          title: "Довідкова документація",
          description:
            "Нормативні документи, технічні довідки та матеріали для щоденної роботи.",
          groupId: env.ARCGIS_GEOSPATIAL_DOCS_GROUP_ID,
          kind: "documents",
        },
        {
          key: "navigation-guides",
          title: "Навігаційні посібники",
          description:
            "Практичні матеріали та настанови щодо використання навігаційних пристроїв.",
          groupId: env.ARCGIS_GEOSPATIAL_NAV_GUIDES_GROUP_ID,
          kind: "documents",
        },
        {
          key: "locality-descriptions",
          title: "Фізико-географічні описи",
          description:
            "Регіональні описи місцевості та фізико-географічні дані для просторового аналізу.",
          groupId: env.ARCGIS_GEOSPATIAL_PHYS_GEO_GROUP_ID,
          kind: "documents",
        },
      ],
    },
  ];
}

export function getArcgisSubsystemConfig(slug: ArcgisSubsystemSlug) {
  return getArcgisSubsystemConfigs().find((config) => config.slug === slug);
}
