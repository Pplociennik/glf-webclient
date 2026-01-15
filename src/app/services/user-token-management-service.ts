import { Injectable } from '@angular/core';
import { Response, ResponseData } from '../shared/models/response/Response';

/**
 * Service for managing user authentication tokens in localStorage.
 * Handles token storage, retrieval, validation, and cleanup.
 */
@Injectable({
  providedIn: 'root',
})
export class UserTokenManagementService {
  // localStorage keys
  private readonly ACCESS_TOKEN_KEY = 'user_access_token';
  private readonly TOKEN_EXPIRY_KEY = 'user_acces_token_expiry';
  private readonly AUTHENTICATED_USER_USERNAME = 'AUTH_USERNAME';

  constructor() {}

  /**
   * Stores token data in localStorage.
   * Calculates expiry timestamp from expires_in value.
   */
  revalidateAuthentication(authInfo: Response<ResponseData>): void {
    const tokenInfo = authInfo.tokenInfo;
    const responseData = authInfo.responseData?.[0];
    if (tokenInfo.refreshed) {
      const expiryTimestamp = Date.now() + tokenInfo.expiresIn * 1000;

      localStorage.setItem(this.ACCESS_TOKEN_KEY, tokenInfo.accessToken);
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTimestamp.toString());
      if (responseData) {
        localStorage.setItem(this.AUTHENTICATED_USER_USERNAME, responseData.username);
      }
    }
  }

  /**
   * Retrieves the stored username of the authenticated user from localStorage.
   * @returns The stored username or an empty string if not found
   */
  getStoredUsername(): string {
    const username = localStorage.getItem(this.AUTHENTICATED_USER_USERNAME);
    return username != null ? username : '';
  }

  /**
   * Retrieves the stored access token from localStorage.
   */
  getStoredAccessToken(): string {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    return accessToken != null ? accessToken : '';
  }

  /**
   * Checks if the stored user token is still valid.
   * @returns True if the token exists and has not expired (with 30s buffer)
   */
  isStillValid(): boolean {
    const expiryStr = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiryStr) {
      return false;
    }

    const expiry = parseInt(expiryStr, 10);
    const now = Date.now();

    return now < expiry - 30000;
  }

  /**
   * Clears all token data from localStorage.
   * Used for logout functionality.
   */
  clearToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }
}
