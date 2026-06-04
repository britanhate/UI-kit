import { type NextResponse } from "next/server";

import { getServerEnv } from "@/lib/env";

export const AUTH_COOKIE_NAMES = {
  oauthState: "gisportal_oauth_state",
  pkceVerifier: "gisportal_pkce_verifier",
  returnTo: "gisportal_return_to",
  session: "gisportal_session",
  arcgisCredential: "gisportal_arcgis_credential",
} as const;

export const OAUTH_TEMP_COOKIE_TTL_SECONDS = 10 * 60;
export const EXPIRY_SKEW_MS = 60 * 1000;

type BaseCookieOptions = {
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: "/";
};

function baseCookieOptions(): BaseCookieOptions {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: getServerEnv().AUTH_COOKIE_SECURE,
    path: "/",
  };
}

export function setTemporaryCookie(
  response: NextResponse,
  name: string,
  value: string,
) {
  response.cookies.set(name, value, {
    ...baseCookieOptions(),
    maxAge: OAUTH_TEMP_COOKIE_TTL_SECONDS,
  });
}

export function setExpiringCookie(
  response: NextResponse,
  name: string,
  value: string,
  expiresAt: number,
) {
  response.cookies.set(name, value, {
    ...baseCookieOptions(),
    expires: new Date(Math.max(0, expiresAt - EXPIRY_SKEW_MS)),
  });
}

export function clearCookie(response: NextResponse, name: string) {
  response.cookies.set(name, "", {
    ...baseCookieOptions(),
    maxAge: 0,
  });
}

export function clearAuthCookies(response: NextResponse) {
  clearCookie(response, AUTH_COOKIE_NAMES.session);
  clearCookie(response, AUTH_COOKIE_NAMES.arcgisCredential);
  clearTemporaryOAuthCookies(response);
}

export function clearTemporaryOAuthCookies(response: NextResponse) {
  clearCookie(response, AUTH_COOKIE_NAMES.oauthState);
  clearCookie(response, AUTH_COOKIE_NAMES.pkceVerifier);
  clearCookie(response, AUTH_COOKIE_NAMES.returnTo);
}

export function isExpired(expiresAt: number) {
  return (
    !Number.isFinite(expiresAt) || Date.now() >= expiresAt - EXPIRY_SKEW_MS
  );
}
