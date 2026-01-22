import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClientAuthRequest } from '../../../shared/models/auth/client-auth-request';
import { KeycloakTokenResponse } from '../../../shared/models/auth/keycloak-token-response';

/**
 * Service for managing OAuth2 client credentials tokens.
 * Handles client authentication with Keycloak and token lifecycle.
 */
@Injectable({
  providedIn: 'root',
})
export class ClientTokenManagementService {
  // Moved from AuthService
  private readonly clientId = 'goaleaf_angular_client';
  private readonly clientSecret = 'a4UCZiHzd9XXzQRxeUgvrRlD0HKU5K1v';
  private readonly grantType = 'client_credentials';
  private readonly scope = 'openid email profile roles service_account';

  // localStorage keys
  private readonly ACCESS_TOKEN_KEY = 'keycloak_access_token';
  private readonly REFRESH_TOKEN_KEY = 'keycloak_refresh_token';
  private readonly TOKEN_EXPIRY_KEY = 'keycloak_token_expiry';

  constructor(private httpClient: HttpClient) {}

  /**
   * Ensures a valid token is available, fetching a new one if needed.
   * Returns the access token synchronously (waits for response).
   */
  async ensureValidToken(): Promise<string> {
    // 1. Check if token exists and is still valid
    if (this.isTokenValid()) {
      const token = this.getStoredAccessToken();
      if (token) {
        return token;
      }
    }

    // 2. Token missing or expired - get new token from Keycloak
    try {
      const response = await firstValueFrom(this.authorizeClient());

      // 3. Store token data in localStorage
      this.storeToken(response);

      // 4. Return access token
      return response.access_token;
    } catch (error) {
      console.error('Failed to authorize client:', error);
      throw new Error('Token acquisition failed');
    }
  }

  /**
   * Requests a new client token from Keycloak.
   * Moved from AuthService.
   */
  private authorizeClient(): Observable<KeycloakTokenResponse> {
    const url = `${environment.keycloakUrl}${environment.endpoints.keycloakClientAuth}`;

    // OAuth2 token endpoint requires application/x-www-form-urlencoded
    const body = new URLSearchParams();
    body.set('grant_type', this.grantType);
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);
    body.set('scope', this.scope);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.httpClient.post<KeycloakTokenResponse>(url, body.toString(), { headers });
  }

  /**
   * Checks if the stored token is still valid.
   * Returns false if token is missing or expired (with 30s buffer).
   */
  private isTokenValid(): boolean {
    const expiryStr = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiryStr) {
      return false;
    }

    const expiry = parseInt(expiryStr, 10);
    const now = Date.now();

    // Add 30 second buffer to refresh before actual expiry
    return now < expiry - 30000;
  }

  /**
   * Stores token data in localStorage.
   * Calculates expiry timestamp from expires_in value.
   */
  private storeToken(response: KeycloakTokenResponse): void {
    const expiryTimestamp = Date.now() + response.expires_in * 1000;

    localStorage.setItem(this.ACCESS_TOKEN_KEY, response.access_token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refresh_token);
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTimestamp.toString());
  }

  /**
   * Retrieves the stored access token from localStorage.
   */
  private getStoredAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Clears all token data from localStorage.
   * Used for logout functionality.
   */
  clearToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }
}
