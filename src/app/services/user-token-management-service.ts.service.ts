import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenInfo } from '../shared/models/response/Response';

@Injectable({
  providedIn: 'root',
})
export class UserTokenManagementService {
  // localStorage keys
  private readonly ACCESS_TOKEN_KEY = 'user_access_token';
  private readonly TOKEN_EXPIRY_KEY = 'user_acces_token_expiry';

  constructor() {}

  /**
   * Stores token data in localStorage.
   * Calculates expiry timestamp from expires_in value.
   */
  revalidateToken(tokenInfo: TokenInfo): void {
    if (tokenInfo.refreshed) {
      const expiryTimestamp = Date.now() + tokenInfo.expiresIn * 1000;

      localStorage.setItem(this.ACCESS_TOKEN_KEY, tokenInfo.accessToken);
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTimestamp.toString());
    }
  }

  /**
   * Retrieves the stored access token from localStorage.
   */
  getStoredAccessToken(): string {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    return accessToken != null ? accessToken : '';
  }

  isStillValid(): boolean {
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
   * Clears all token data from localStorage.
   * Used for logout functionality.
   */
  clearToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }
}
