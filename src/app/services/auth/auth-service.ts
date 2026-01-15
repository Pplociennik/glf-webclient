import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationModel } from '../../shared/models/auth/registration-model';
import { Response, ResponseData } from '../../shared/models/response/Response';
import { environment } from '../../../environments/environment';
import { ApiPaths } from '../../enums/ApiPaths';
import { EMPTY, from, Observable, switchMap } from 'rxjs';
import { LoginModel } from '../../shared/models/auth/authentication-request-model';
import { ClientTokenManagementService } from './client-token-management.service';
import { ConfirmationLinkRequest } from '../../shared/models/auth/confirmation-link-request';
import { UserTokenManagementService } from '../user-token-management-service';
import { Token } from '@angular/compiler';
import { PasswordResetRequest } from '../../shared/models/auth/password-reset-request';
import { LanguageService } from '../lang/language-service';

/**
 * Service responsible for user authentication operations.
 * Handles registration, login, session management, and password reset.
 * All requests are authenticated using client tokens managed by ClientTokenManagementService.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.baseUrl}${ApiPaths.Auth}`;

  constructor(
    private httpClient: HttpClient,
    private clientTokenService: ClientTokenManagementService,
    private userTokenService: UserTokenManagementService,
    private languageService: LanguageService
  ) {
    // Eager initialization - fetch token immediately on service creation
    this.clientTokenService.ensureValidToken().catch((error: unknown) => {
      console.error('Failed to initialize client token:', error);
    });
  }

  /**
   * Registers a new user account.
   * @param registrationModel - User registration data containing credentials and profile info
   * @returns Observable containing the registration response
   */
  register(registrationModel: RegistrationModel): Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.register}`;
    const language = this.languageService.getCurrentLanguage();
    console.log(language);

    // Convert Promise to Observable and chain the HTTP request
    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Accept-Language', language);
        return this.httpClient.post<Response<void>>(url, registrationModel, { headers });
      })
    );
  }

  /**
   * Authenticates a user with the provided credentials.
   * @param authRequestModel - Login credentials containing email and password
   * @returns Observable containing the authentication response
   */
  login(authRequestModel: LoginModel): Observable<Response<ResponseData>> {
    const url = `${this.baseUrl}${environment.endpoints.login}`;

    // Convert Promise to Observable and chain the HTTP request
    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.httpClient.post<Response<ResponseData>>(url, authRequestModel, { headers });
      })
    );
  }

  /**
   * Requests a new email confirmation link for the user.
   * @param linkRequestModel - Request data containing the email to send confirmation to
   * @returns Observable containing the confirmation link request response
   */
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

  /**
   * Refreshes the current user session if the stored token has expired.
   * Returns EMPTY observable if no token exists or token is still valid.
   * @param userAccessToken - Current user access token to refresh
   * @returns Observable containing the session refresh response, or EMPTY if refresh not needed
   */
  refreshUserSession(userAccessToken: string): Observable<Response<ResponseData>> {
    const url = `${this.baseUrl}${environment.endpoints.sessionRefresh}`;
    const currentStoredUserToken = this.userTokenService.getStoredAccessToken();

    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const userTokenValid = this.userTokenService.isStillValid();

        if (currentStoredUserToken != null && !userTokenValid) {
          const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('User-Token', currentStoredUserToken);

          return this.httpClient.post<Response<ResponseData>>(url, currentStoredUserToken, {
            headers,
          });
        } else {
          return EMPTY;
        }
      })
    );
  }

  /**
   * Logs out the current user and terminates their session.
   * @param userToken - User token identifying the session to terminate
   * @returns Observable containing the logout response
   */
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
