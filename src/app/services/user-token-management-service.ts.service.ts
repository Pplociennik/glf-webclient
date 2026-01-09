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

  constructor(private httpClient: HttpClient) {}

  /**
   * Stores token data in localStorage.
   * Calculates expiry timestamp from expires_in value.
   */
  revalidateToken(tokenInfo: TokenInfo): void {
    if (tokenInfo.refreshed) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, tokenInfo.accessToken);
    }
  }

  /**
   * Retrieves the stored access token from localStorage.
   */
  getStoredAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Clears all token data from localStorage.
   * Used for logout functionality.
   */
  clearToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}
