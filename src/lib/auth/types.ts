export type SessionPayload = {
  username: string;
  fullName: string;
  id: string;
  email?: string;
  role?: string;
  expiresAt: number;
};

export type TokenEnvelope = {
  accessToken: string;
  expiresAt: number;
};

export type AuthenticatedState = {
  authenticated: true;
  user: SessionPayload;
  token: TokenEnvelope;
};

export type UnauthenticatedState = {
  authenticated: false;
  user: null;
  token: null;
};

export type AuthState = AuthenticatedState | UnauthenticatedState;

export type ArcgisSelfProfile = {
  username?: unknown;
  fullName?: unknown;
  id?: unknown;
  email?: unknown;
  role?: unknown;
  orgId?: unknown;
  userType?: unknown;
  privileges?: unknown;
  error?: {
    code?: number;
    message?: string;
  };
};

export type SanitizedArcgisProfile = {
  username: string;
  fullName: string;
  id: string;
  email?: string;
  role?: string;
  orgId?: string;
  userType?: string;
  privileges?: string[];
};
