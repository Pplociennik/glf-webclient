import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationModel } from '../../../shared/models/auth/registration-model';
import { Response, ResponseData } from '../../../shared/models/response/response.model';
import { environment } from '../../../../environments/environment';
import { ApiPaths } from '../../../enums/ApiPaths';
import { Endpoints } from '../../../enums/Endpoints';
import { LoginModel } from '../../../shared/models/auth/authentication-request-model';
import { ConfirmationLinkRequest } from '../../../shared/models/auth/confirmation-link-request';

/**
 * Service responsible for user authentication operations.
 * Handles registration, login, session management, and password reset.
 * Authentication headers are automatically attached by HTTP interceptors.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.baseUrl}${ApiPaths.Auth}`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Registers a new user account.
   * @param registrationModel - User registration data containing credentials and profile info
   * @returns Observable containing the registration response
   */
  register(registrationModel: RegistrationModel): Observable<Response<void>> {
    const url = `${this.baseUrl}${Endpoints.Register}`;
    return this.httpClient.post<Response<void>>(url, registrationModel);
  }

  /**
   * Authenticates a user with the provided credentials.
   * @param authRequestModel - Login credentials containing email and password
   * @returns Observable containing the authentication response
   */
  login(authRequestModel: LoginModel): Observable<Response<ResponseData>> {
    const url = `${this.baseUrl}${Endpoints.Login}`;
    return this.httpClient.post<Response<ResponseData>>(url, authRequestModel);
  }

  /**
   * Requests a new email confirmation link for the user.
   * @param linkRequestModel - Request data containing the email to send confirmation to
   * @returns Observable containing the confirmation link request response
   */
  requestConfirmationLink(linkRequestModel: ConfirmationLinkRequest): Observable<Response<void>> {
    const url = `${environment.baseUrl}${ApiPaths.Accounts}${Endpoints.EmailConfirmationRequest}`;
    return this.httpClient.post<Response<void>>(url, linkRequestModel);
  }

  /**
   * Logs out the current user and terminates their session.
   * @returns Observable containing the logout response
   */
  logoutCurrentUserSession(): Observable<Response<void>> {
    const url = `${environment.baseUrl}${ApiPaths.Auth}${Endpoints.Logout}`;
    return this.httpClient.delete<Response<void>>(url);
  }

  logoutSpecificUserSession(sessionId: string): Observable<Response<void>> {
    const url = `${this.baseUrl}${Endpoints.LogoutSession}`;
    return this.httpClient.delete<Response<void>>(url, { params: { sessionId } });
  }

  logoutAllUserSessions() {
    const url = `${this.baseUrl}${Endpoints.LogoutAll}`;
    return this.httpClient.post<Response<void>>(url, {});
  }
}
