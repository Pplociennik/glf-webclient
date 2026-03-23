/**
 * Standard JWT claims as defined in RFC 7519.
 */
export interface JwtStandardClaims {
  /** Issuer - identifies the principal that issued the JWT */
  iss?: string;
  /** Subject - identifies the principal that is the subject of the JWT */
  sub?: string;
  /** Audience - identifies the recipients that the JWT is intended for */
  aud?: string | string[];
  /** Expiration Time - identifies the expiration time (Unix timestamp) */
  exp?: number;
  /** Not Before - identifies the time before which the JWT must not be accepted */
  nbf?: number;
  /** Issued At - identifies the time at which the JWT was issued (Unix timestamp) */
  iat?: number;
  /** JWT ID - provides a unique identifier for the JWT */
  jti?: string;
}

/**
 * Realm access structure containing roles assigned at the realm level.
 */
export interface RealmAccess {
  roles: string[];
}

/**
 * Resource access structure containing roles for specific clients/resources.
 */
export interface ResourceAccess {
  [clientId: string]: {
    roles: string[];
  };
}

/**
 * Keycloak-specific claims present in access tokens.
 * Extends standard JWT claims with identity and session information.
 */
export interface KeycloakAccessTokenClaims extends JwtStandardClaims {
  /** User's email address */
  email?: string;
  /** Whether the user's email has been verified */
  email_verified?: boolean;
  /** Keycloak session ID */
  sid?: string;
  /** Preferred username for display */
  preferred_username?: string;
  /** User's given (first) name */
  given_name?: string;
  /** User's family (last) name */
  family_name?: string;
  /** User's full name */
  name?: string;
  /** Realm-level role assignments */
  realm_access?: RealmAccess;
  /** Client-specific role assignments */
  resource_access?: ResourceAccess;
  /** Token type (typically 'Bearer') */
  typ?: string;
  /** Authorized party - the client that the token was issued to */
  azp?: string;
  /** Session state identifier */
  session_state?: string;
  /** Access control list */
  acr?: string;
  /** Allowed origins for CORS */
  allowed_origins?: string[];
  /** Scope of the token */
  scope?: string;
}

/**
 * JWT header containing algorithm and type information.
 */
export interface JwtHeader {
  /** Algorithm used to sign the token (e.g., 'RS256') */
  alg: string;
  /** Type of token (typically 'JWT') */
  typ: string;
  /** Key ID - identifies which key was used to sign the token */
  kid?: string;
}

/**
 * Fully decoded JWT structure with header, payload, and raw signature.
 */
export interface DecodedJwt<T = KeycloakAccessTokenClaims> {
  /** Decoded JWT header */
  header: JwtHeader;
  /** Decoded JWT payload containing claims */
  payload: T;
  /** Raw signature string (base64url encoded) */
  signature: string;
}
