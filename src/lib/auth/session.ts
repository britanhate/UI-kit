import { cookies } from "next/headers";

import { AUTH_COOKIE_NAMES, isExpired } from "@/lib/auth/cookies";
import { decryptPayload, encryptPayload, signPayload, verifySignedPayload } from "@/lib/auth/crypto";
import { readOptionalString, readString, readStringArray } from "@/lib/common-validators";
import { getServerEnv } from "@/lib/env";

import type {
  ArcgisSelfProfile,
  AuthState,
  SanitizedArcgisProfile,
  SessionPayload,
  TokenEnvelope,
} from "@/lib/auth/types";

export function sanitizeReturnTo(returnTo: string | null | undefined) {
  if (!returnTo) return "/platform";

  let decoded = returnTo;

  try {
    decoded = decodeURIComponent(returnTo);
  } catch {
    return "/platform";
  }

  if (decoded.startsWith("//") || decoded.includes("\\")) {
    return "/platform";
  }

  try {
    const appUrl = new URL(getServerEnv().APP_BASE_URL);
    const appOrigin = appUrl.origin;
    const parsed = new URL(decoded, appUrl);

    if (parsed.origin !== appOrigin) return "/platform";

    const isPlatformPath = parsed.pathname === "/platform" || parsed.pathname.startsWith("/platform/");

    if (!isPlatformPath) return "/platform";

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return "/platform";
  }
}
// Keep this domain wrapper: session cookies are signed, not encrypted.
export function createSessionCookieValue(payload: SessionPayload) {
  return signPayload(payload);
}

export function readSessionCookieValue(value: string | undefined) {
  if (!value) return null;

  const payload = verifySignedPayload<SessionPayload>(value);

  if (!isValidSessionPayload(payload) || isExpired(payload.expiresAt)) return null;

  return payload;
}

// Keep this domain wrapper: ArcGIS credentials are encrypted before storing in cookies.
export function createTokenCookieValue(payload: TokenEnvelope) {
  return encryptPayload(payload);
}

export function readTokenCookieValue(value: string | undefined) {
  if (!value) return null;

  const payload = decryptPayload<TokenEnvelope>(value);

  if (!isValidTokenEnvelope(payload) || isExpired(payload.expiresAt)) return null;

  return payload;
}

export async function getAuthState(_route = "unknown"): Promise<AuthState> {
  void _route;

  const cookieStore = await cookies();
  const session = readSessionCookieValue(cookieStore.get(AUTH_COOKIE_NAMES.session)?.value);
  const token = readTokenCookieValue(cookieStore.get(AUTH_COOKIE_NAMES.arcgisCredential)?.value);

  if (!session || !token) {
    return {
      authenticated: false,
      user: null,
      token: null,
    };
  }

  return {
    authenticated: true,
    user: session,
    token,
  };
}

export function sanitizeArcgisProfile(profile: ArcgisSelfProfile): SanitizedArcgisProfile {
  const username = readString(profile.username);
  const id = readString(profile.id) || username;

  return {
    username,
    fullName: readString(profile.fullName) || username,
    id,
    email: readOptionalString(profile.email),
    role: readOptionalString(profile.role),
    orgId: readOptionalString(profile.orgId),
    userType: readOptionalString(profile.userType),
    privileges: readStringArray(profile.privileges),
  };
}

export function createSessionFromProfile(profile: ArcgisSelfProfile, expiresAt: number): SessionPayload {
  const sanitized = sanitizeArcgisProfile(profile);

  if (!sanitized.username || !sanitized.id) {
    throw new Error("ArcGIS profile is missing required user identity fields.");
  }

  return {
    username: sanitized.username,
    fullName: sanitized.fullName,
    id: sanitized.id,
    email: sanitized.email,
    role: sanitized.role,
    expiresAt,
  };
}

function isValidSessionPayload(payload: SessionPayload | null): payload is SessionPayload {
  return Boolean(
    payload &&
    typeof payload.username === "string" &&
    typeof payload.fullName === "string" &&
    typeof payload.id === "string" &&
    typeof payload.expiresAt === "number" &&
    (!payload.email || typeof payload.email === "string") &&
    (!payload.role || typeof payload.role === "string"),
  );
}

function isValidTokenEnvelope(payload: TokenEnvelope | null): payload is TokenEnvelope {
  return Boolean(
    payload &&
    typeof payload.accessToken === "string" &&
    payload.accessToken.length > 0 &&
    typeof payload.expiresAt === "number",
  );
}
