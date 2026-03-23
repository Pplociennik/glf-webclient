import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserTokenManagementService } from '../../user-token-management-service';
import {
  DecodedJwt,
  JwtHeader,
  KeycloakAccessTokenClaims,
} from '../../../shared/models/jwt/jwt-payload.model';

/**
 * Service for decoding and extracting information from JWT tokens.
 * Provides methods to access user identity, session, and role information
 * from Keycloak access tokens stored in localStorage.
 *
 * Note: This service performs client-side decoding only and does not
 * verify token signatures. Claims should be used for UI purposes,
 * not security decisions.
 */
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private userTokenManagementService: UserTokenManagementService) {}

  /**
   * Decodes a JWT token string and returns the payload.
   * @param token The JWT token string to decode
   * @returns The decoded payload or null if decoding fails
   */
  decodeToken<T = KeycloakAccessTokenClaims>(token: string): T | null {
    if (!token || token.trim() === '') {
      return null;
    }

    try {
      return jwtDecode<T>(token);
    } catch {
      return null;
    }
  }

  /**
   * Decodes the currently stored user access token.
   * @returns The decoded payload or null if no token is stored or decoding fails
   */
  decodeStoredToken(): KeycloakAccessTokenClaims | null {
    const token = this.userTokenManagementService.getStoredAccessToken();
    return this.decodeToken(token);
  }

  /**
   * Extracts the user's email from the stored access token.
   * @returns The user's email or null if not available
   */
  getUserEmail(): string | null {
    const payload = this.decodeStoredToken();
    return payload?.email ?? null;
  }

  /**
   * Extracts the Keycloak session ID from the stored access token.
   * @returns The session ID (sid claim) or null if not available
   */
  getSessionId(): string | null {
    const payload = this.decodeStoredToken();
    return payload?.sid ?? null;
  }

  /**
   * Extracts the preferred username from the stored access token.
   * @returns The preferred username or null if not available
   */
  getPreferredUsername(): string | null {
    const payload = this.decodeStoredToken();
    return payload?.preferred_username ?? null;
  }

  /**
   * Extracts the user's full name from the stored access token.
   * @returns The user's full name or null if not available
   */
  getUserFullName(): string | null {
    const payload = this.decodeStoredToken();
    return payload?.name ?? null;
  }

  /**
   * Extracts the user ID (subject claim) from the stored access token.
   * @returns The user ID (UUID) or null if not available
   */
  getUserId(): string | null {
    const payload = this.decodeStoredToken();
    return payload?.sub ?? null;
  }

  /**
   * Extracts the realm-level roles from the stored access token.
   * @returns Array of role names or empty array if not available
   */
  getUserRoles(): string[] {
    const payload = this.decodeStoredToken();
    return payload?.realm_access?.roles ?? [];
  }

  /**
   * Checks if the user has a specific realm-level role.
   * @param role The role name to check for
   * @returns True if the user has the specified role
   */
  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  /**
   * Gets the token expiration timestamp from the stored access token.
   * @returns The expiration timestamp (Unix seconds) or null if not available
   */
  getTokenExpiration(): number | null {
    const payload = this.decodeStoredToken();
    return payload?.exp ?? null;
  }

  /**
   * Checks if the stored token has expired based on the exp claim.
   * @returns True if the token is expired or no valid token exists
   */
  isTokenExpired(): boolean {
    const exp = this.getTokenExpiration();
    if (exp === null) {
      return true;
    }

    const nowInSeconds = Math.floor(Date.now() / 1000);
    return nowInSeconds >= exp;
  }

  /**
   * Checks if the user's email has been verified.
   * @returns True if email is verified, false otherwise
   */
  isEmailVerified(): boolean {
    const payload = this.decodeStoredToken();
    return payload?.email_verified ?? false;
  }

  /**
   * Decodes a JWT token and returns the full structure including header and signature.
   * @param token The JWT token string to decode
   * @returns The decoded JWT structure or null if decoding fails
   */
  decodeTokenFull<T = KeycloakAccessTokenClaims>(token: string): DecodedJwt<T> | null {
    if (!token || token.trim() === '') {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    try {
      const header = JSON.parse(this.base64UrlDecode(parts[0])) as JwtHeader;
      const payload = jwtDecode<T>(token);

      return {
        header,
        payload,
        signature: parts[2],
      };
    } catch {
      return null;
    }
  }

  /**
   * Decodes a base64url encoded string.
   * @param str The base64url encoded string
   * @returns The decoded string
   */
  private base64UrlDecode(str: string): string {
    // Replace base64url characters with standard base64
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding if necessary
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }

    return atob(base64);
  }
}
