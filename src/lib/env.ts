export type ServerEnv = {
  APP_BASE_URL: string;
  ARCGIS_PORTAL_URL: string;
  ARCGIS_CLIENT_ID: string;
  ARCGIS_CLIENT_SECRET: string;
  AUTH_COOKIE_SECRET: string;
  AUTH_COOKIE_SECURE: boolean;
  DEBUG_AUTH: boolean;
  DEBUG_ARCGIS: boolean;
};
export type ArcgisGroupsEnv = {
  ARCGIS_GEOPORTAL_APPS_GROUP_ID: string;
  ARCGIS_GEOSPATIAL_APPS_GROUP_ID: string;
  ARCGIS_GEOSPATIAL_DOCS_GROUP_ID: string;
  ARCGIS_GEOSPATIAL_NAV_GUIDES_GROUP_ID: string;
  ARCGIS_GEOSPATIAL_PHYS_GEO_GROUP_ID: string;
};

type RequiredServerEnvKey =
  | "APP_BASE_URL"
  | "ARCGIS_PORTAL_URL"
  | "ARCGIS_CLIENT_ID"
  | "ARCGIS_CLIENT_SECRET"
  | "AUTH_COOKIE_SECRET";

type RequiredArcgisGroupsEnvKey =
  | "ARCGIS_GEOPORTAL_APPS_GROUP_ID"
  | "ARCGIS_GEOSPATIAL_APPS_GROUP_ID"
  | "ARCGIS_GEOSPATIAL_DOCS_GROUP_ID"
  | "ARCGIS_GEOSPATIAL_NAV_GUIDES_GROUP_ID"
  | "ARCGIS_GEOSPATIAL_PHYS_GEO_GROUP_ID";


function readRequiredEnv(key: RequiredServerEnvKey | RequiredArcgisGroupsEnvKey) {
  const value = process.env[key];

  if (!value?.trim()) {
    throw new Error(`Missing required server environment variable: ${key}`);
  }

  return value.trim();
}
function parseUrl(value: string, key: string) {
  try {
    return new URL(value);
  } catch {
    throw new Error(`Invalid URL in server environment variable: ${key}`);
  }
}

function parseSecureCookieFlag() {
  const rawValue = process.env.AUTH_COOKIE_SECURE ?? "true";

  if (rawValue !== "true" && rawValue !== "false") {
    throw new Error('AUTH_COOKIE_SECURE must be either "true" or "false".');
  }

  const secure = rawValue === "true";

  if (process.env.NODE_ENV === "production" && !secure) {
    throw new Error("AUTH_COOKIE_SECURE must be true in production.");
  }

  return secure;
}

function normalizeUrlWithoutTrailingSlash(value: string, key: string) {
  const url = parseUrl(value, key);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`${key} must use http or https protocol.`);
  }

  return url.toString().replace(/\/+$/, "");
}

export function getServerEnv(): ServerEnv {
  const appBaseUrl = normalizeUrlWithoutTrailingSlash(
    readRequiredEnv("APP_BASE_URL"),
    "APP_BASE_URL",
  );

  const arcgisPortalUrl = normalizeUrlWithoutTrailingSlash(
    readRequiredEnv("ARCGIS_PORTAL_URL"),
    "ARCGIS_PORTAL_URL",
  );

  const authCookieSecret = readRequiredEnv("AUTH_COOKIE_SECRET");

  if (authCookieSecret.length < 32) {
    throw new Error("AUTH_COOKIE_SECRET must be at least 32 characters long.");
  }

  return {
    APP_BASE_URL: appBaseUrl,
    ARCGIS_PORTAL_URL: arcgisPortalUrl,
    ARCGIS_CLIENT_ID: readRequiredEnv("ARCGIS_CLIENT_ID"),
    ARCGIS_CLIENT_SECRET: readRequiredEnv("ARCGIS_CLIENT_SECRET"),
    AUTH_COOKIE_SECRET: authCookieSecret,
    AUTH_COOKIE_SECURE: parseSecureCookieFlag(),
    DEBUG_AUTH: process.env.DEBUG_AUTH === "true",
    DEBUG_ARCGIS: process.env.DEBUG_ARCGIS === "true",
  };
}

export function getArcgisGroupsEnv(): ArcgisGroupsEnv {
  return {
    ARCGIS_GEOPORTAL_APPS_GROUP_ID: readRequiredEnv(
      "ARCGIS_GEOPORTAL_APPS_GROUP_ID",
    ),
    ARCGIS_GEOSPATIAL_APPS_GROUP_ID: readRequiredEnv(
      "ARCGIS_GEOSPATIAL_APPS_GROUP_ID",
    ),
    ARCGIS_GEOSPATIAL_DOCS_GROUP_ID: readRequiredEnv(
      "ARCGIS_GEOSPATIAL_DOCS_GROUP_ID",
    ),
    ARCGIS_GEOSPATIAL_NAV_GUIDES_GROUP_ID: readRequiredEnv(
      "ARCGIS_GEOSPATIAL_NAV_GUIDES_GROUP_ID",
    ),
    ARCGIS_GEOSPATIAL_PHYS_GEO_GROUP_ID: readRequiredEnv(
      "ARCGIS_GEOSPATIAL_PHYS_GEO_GROUP_ID",
    ),
  };
}


export function getOAuthRedirectUri() {
  return `${getServerEnv().APP_BASE_URL}/api/auth/callback`;
}
