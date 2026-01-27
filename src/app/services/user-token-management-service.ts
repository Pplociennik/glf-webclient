import { Injectable } from '@angular/core';
import { Response, ResponseData } from '../shared/models/response/response.model';
import { SessionRefreshService } from './features/auth/session-refresh.service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

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

  private readonly authenticatedSubject = new BehaviorSubject<boolean>(this.checkLocalToken());

  /**
   * Observable that emits the current authentication state.
   * Components can subscribe to reactively update when auth state changes.
   */
  readonly isAuthenticated$: Observable<boolean> = this.authenticatedSubject.asObservable();

  constructor(private sessionRefreshService: SessionRefreshService) {}

  /**
   * Returns the current authentication state synchronously.
   * Use isAuthenticated$ for reactive updates.
   */
  get isAuthenticated(): boolean {
    return this.authenticatedSubject.value;
  }

  /**
   * Stores token data in localStorage.
   * Calculates expiry timestamp from expires_in value.
   * @param authInfo - Response containing token information and user data
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
      this.authenticatedSubject.next(true);
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
   * @returns The stored access token or an empty string if not found
   */
  getStoredAccessToken(): string {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    return accessToken != null ? accessToken : '';
  }

  /**
   * Checks if the stored user token is still valid.
   * If the local token is expired, attempts to refresh it from the server.
   * @returns Promise resolving to true if the token is valid or was successfully refreshed
   */
  async isStillValid(): Promise<boolean> {
    const localTokenValid = this.checkLocalToken();

    if (localTokenValid) {
      this.authenticatedSubject.next(true);
      return true;
    }

    const userToken = this.getStoredAccessToken();

    if (userToken === '') {
      this.authenticatedSubject.next(false);
      return false;
    }

    try {
      const response = await firstValueFrom(this.sessionRefreshService.refreshUserSession());
      this.revalidateAuthentication(response);
      return true;
    } catch {
      this.authenticatedSubject.next(false);
      return false;
    }
  }

  /**
   * Checks if the locally stored token is still valid based on expiry timestamp.
   * @returns True if token exists and has not expired (with 30s buffer)
   */
  private checkLocalToken(): boolean {
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
    this.authenticatedSubject.next(false);
  }
}
