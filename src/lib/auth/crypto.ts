import crypto from "node:crypto";

import { getServerEnv } from "@/lib/env";

const HMAC_ALGORITHM = "sha256";
const AES_ALGORITHM = "aes-256-gcm";
const SESSION_COOKIE_VERSION = "v1";
const ENCRYPTED_COOKIE_VERSION = "v1";

function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url");
}

function getCookieKey() {
  return crypto
    .createHash("sha256")
    .update(getServerEnv().AUTH_COOKIE_SECRET, "utf8")
    .digest();
}

function timingSafeEqualString(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) return false;

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function generateRandomState() {
  return crypto.randomBytes(32).toString("base64url");
}

export function generatePkceVerifier() {
  return crypto.randomBytes(64).toString("base64url");
}

export function generatePkceChallenge(verifier: string) {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

export function signPayload<T>(payload: T) {
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac(HMAC_ALGORITHM, getCookieKey())
    .update(body)
    .digest("base64url");

  return `${SESSION_COOKIE_VERSION}.${body}.${signature}`;
}

export function verifySignedPayload<T>(value: string): T | null {
  const [version, body, signature, ...rest] = value.split(".");

  if (rest.length > 0 || version !== SESSION_COOKIE_VERSION || !body || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac(HMAC_ALGORITHM, getCookieKey())
    .update(body)
    .digest("base64url");

  if (!timingSafeEqualString(signature, expectedSignature)) return null;

  try {
    return JSON.parse(base64UrlDecode(body).toString("utf8")) as T;
  } catch {
    return null;
  }
}

export function encryptPayload<T>(payload: T) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(AES_ALGORITHM, getCookieKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    ENCRYPTED_COOKIE_VERSION,
    iv.toString("base64url"),
    ciphertext.toString("base64url"),
    authTag.toString("base64url"),
  ].join(".");
}

export function decryptPayload<T>(value: string): T | null {
  const [version, iv, ciphertext, authTag, ...rest] = value.split(".");

  if (
    rest.length > 0 ||
    version !== ENCRYPTED_COOKIE_VERSION ||
    !iv ||
    !ciphertext ||
    !authTag
  ) {
    return null;
  }

  try {
    const decipher = crypto.createDecipheriv(
      AES_ALGORITHM,
      getCookieKey(),
      base64UrlDecode(iv),
    );
    decipher.setAuthTag(base64UrlDecode(authTag));

    const plaintext = Buffer.concat([
      decipher.update(base64UrlDecode(ciphertext)),
      decipher.final(),
    ]).toString("utf8");

    return JSON.parse(plaintext) as T;
  } catch {
    return null;
  }
}
