import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationModel } from '../../shared/models/auth/registration-model';
import { Response } from '../../shared/models/response/Response';
import { environment } from '../../../environments/environment';
import { ApiPaths } from '../../enums/ApiPaths';
import { EMPTY, from, Observable, switchMap } from 'rxjs';
import { LoginModel } from '../../shared/models/auth/authentication-request-model';
import { ClientTokenManagementService } from './client-token-management.service';
import { ConfirmationLinkRequest } from '../../shared/models/auth/confirmation-link-request';
import { UserTokenManagementService } from '../user-token-management-service.ts.service';
import { Token } from '@angular/compiler';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.baseUrl}${ApiPaths.Auth}`;

  constructor(
    private httpClient: HttpClient,
    private clientTokenService: ClientTokenManagementService,
    private userTokenService: UserTokenManagementService
  ) {
    // Eager initialization - fetch token immediately on service creation
    this.clientTokenService.ensureValidToken().catch((error: unknown) => {
      console.error('Failed to initialize client token:', error);
    });
  }

  register(registrationModel: RegistrationModel): Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.register}`;

    // Convert Promise to Observable and chain the HTTP request
    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.httpClient.post<Response<void>>(url, registrationModel, { headers });
      })
    );
  }

  login(authRequestModel: LoginModel): Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.login}`;

    // Convert Promise to Observable and chain the HTTP request
    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.httpClient.post<Response<void>>(url, authRequestModel, { headers });
      })
    );
  }

  requestConfirmationLink(linkRequestModel: ConfirmationLinkRequest): Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.emailConfirmationRequest}`;

    // Convert Promise to Observable and chain the HTTP request
    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.httpClient.post<Response<void>>(url, linkRequestModel, { headers });
      })
    );
  }

  refreshUserSession(userAccessToken: string): Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.sessionRefresh}`;
    const currentStoredUserToken = this.userTokenService.getStoredAccessToken();

    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const userTokenValid = this.userTokenService.isStillValid();

        if (currentStoredUserToken != null && !userTokenValid) {
          const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('User-Token', currentStoredUserToken);

          return this.httpClient.post<Response<void>>(url, currentStoredUserToken, { headers });
        } else {
          return EMPTY;
        }
      })
    );
  }

  logoutCurrentUserSession(userToken: string): Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.logout}`;
    const userAccessToken = this.userTokenService.getStoredAccessToken();

    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('User-Token', userAccessToken);

        return this.httpClient.delete<Response<void>>(url, { headers });
      })
    );
  }
}
