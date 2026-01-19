import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, ResponseData } from '../../shared/models/response/Response';
import { environment } from '../../../environments/environment';
import { ApiPaths } from '../../enums/ApiPaths';

/**
 * Service responsible for refreshing user sessions.
 * Handles the HTTP communication for session refresh operations.
 * Authentication headers are automatically attached by HTTP interceptors.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionRefreshService {
  private baseUrl = `${environment.baseUrl}${ApiPaths.Auth}`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Refreshes the user session by sending a refresh request to the server.
   * The User-Token header is automatically attached by the UserAuthInterceptor.
   * @returns Observable containing the session refresh response
   */
  refreshUserSession(): Observable<Response<ResponseData>> {
    const url = `${this.baseUrl}${environment.endpoints.sessionRefresh}`;
    return this.httpClient.post<Response<ResponseData>>(url, {});
  }
}
