import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { Response, ResponseData } from '../../shared/models/response/Response';
import { environment } from '../../../environments/environment';
import { ApiPaths } from '../../enums/ApiPaths';
import { ClientTokenManagementService } from './client-token-management.service';

/**
 * Service responsible for refreshing user sessions.
 * Handles the HTTP communication for session refresh operations.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionRefreshService {
  private baseUrl = `${environment.baseUrl}${ApiPaths.Auth}`;

  constructor(
    private httpClient: HttpClient,
    private clientTokenService: ClientTokenManagementService
  ) {}

  /**
   * Refreshes the user session by sending a refresh request to the server.
   * @param userAccessToken - The current user access token to refresh
   * @returns Observable containing the session refresh response
   */
  refreshUserSession(userAccessToken: string): Observable<Response<ResponseData>> {
    const url = `${this.baseUrl}${environment.endpoints.sessionRefresh}`;

    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('User-Token', userAccessToken);

        return this.httpClient.post<Response<ResponseData>>(url, userAccessToken, {
          headers,
        });
      })
    );
  }
}
