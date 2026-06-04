import { createArcgisFormPostRequest } from "@/lib/arcgis/request";
import { getOAuthRedirectUri, getServerEnv } from "@/lib/env";

import type { ArcgisSelfProfile } from "@/lib/auth/types";

type BuildAuthorizeUrlArgs = {
  state: string;
  codeChallenge: string;
  returnTo?: string;
};

type ExchangeCodeForTokenArgs = {
  code: string;
  codeVerifier: string;
};

type FetchArcgisSelfArgs = {
  accessToken: string;
  route?: string;
};

type ArcgisTokenResponse = {
  access_token?: unknown;
  expires_in?: unknown;
  expires?: unknown;
  error?: unknown;
  error_description?: unknown;
};

export class ArcgisOAuthError extends Error {
  constructor(
    message: string,
    public readonly code: "TOKEN_EXCHANGE" | "PROFILE_FETCH",
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ArcgisOAuthError";
  }
}

export function buildAuthorizeUrl({
  state,
  codeChallenge,
}: BuildAuthorizeUrlArgs) {
  const env = getServerEnv();
  const url = new URL(`${env.ARCGIS_PORTAL_URL}/sharing/rest/oauth2/authorize`);

  url.searchParams.set("client_id", env.ARCGIS_CLIENT_ID);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", getOAuthRedirectUri());
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");

  return url;
}

export async function exchangeCodeForToken({
  code,
  codeVerifier,
}: ExchangeCodeForTokenArgs) {
  const env = getServerEnv();
  const body = new URLSearchParams({
    f: "json",
    client_id: env.ARCGIS_CLIENT_ID,
    client_secret: env.ARCGIS_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: getOAuthRedirectUri(),
    code,
    code_verifier: codeVerifier,
  });

  const response = await fetch(
    `${env.ARCGIS_PORTAL_URL}/sharing/rest/oauth2/token`,
    createArcgisFormPostRequest(body),
  );

  const json = (await response
    .json()
    .catch(() => null)) as ArcgisTokenResponse | null;

  if (
    !response.ok ||
    !json ||
    json.error ||
    typeof json.access_token !== "string"
  ) {
    throw new ArcgisOAuthError(
      "ArcGIS token exchange failed.",
      "TOKEN_EXCHANGE",
      response.status,
    );
  }

  return {
    accessToken: json.access_token,
    expiresAt: normalizeArcgisExpiresAt(json),
  };
}

export async function fetchArcgisSelf({ accessToken }: FetchArcgisSelfArgs) {
  const env = getServerEnv();
  const body = new URLSearchParams({
    f: "json",
    token: accessToken,
  });

  const response = await fetch(
    `${env.ARCGIS_PORTAL_URL}/sharing/rest/community/self`,
    createArcgisFormPostRequest(body),
  );

  const json = (await response
    .json()
    .catch(() => null)) as ArcgisSelfProfile | null;

  if (!response.ok || !json || json.error) {
    throw new ArcgisOAuthError(
      "ArcGIS profile fetch failed.",
      "PROFILE_FETCH",
      response.status,
    );
  }

  return json;
}

function normalizeArcgisExpiresAt(response: ArcgisTokenResponse) {
  if (typeof response.expires_in === "number") {
    return Date.now() + response.expires_in * 1000;
  }

  if (typeof response.expires_in === "string" && response.expires_in.trim()) {
    const expiresIn = Number(response.expires_in);

    if (Number.isFinite(expiresIn)) return Date.now() + expiresIn * 1000;
  }

  if (typeof response.expires === "number") {
    return normalizeAbsoluteExpiry(response.expires);
  }

  if (typeof response.expires === "string" && response.expires.trim()) {
    const expires = Number(response.expires);

    if (Number.isFinite(expires)) return normalizeAbsoluteExpiry(expires);
  }

  throw new ArcgisOAuthError(
    "ArcGIS token response is missing expiration.",
    "TOKEN_EXCHANGE",
  );
}

function normalizeAbsoluteExpiry(expires: number) {
  return expires < 10_000_000_000 ? expires * 1000 : expires;
}
