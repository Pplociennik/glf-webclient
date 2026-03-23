import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiPaths } from '../../../enums/ApiPaths';
import { Endpoints } from '../../../enums/Endpoints';
import { PasswordResetRequest } from '../../../shared/models/auth/password-reset-request';
import { Response } from '../../../shared/models/response/response.model';
import { PasswordChangeRequestMomdel } from '../../../shared/models/accounts/change-password-request.model';

/**
 * Service for account management operations.
 * Handles password reset and other account-related API requests.
 * Authentication headers are automatically attached by HTTP interceptors.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private baseUrl = `${environment.baseUrl}${ApiPaths.Accounts}`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Initiates a password reset request for the user.
   * @param requestModel - Password reset request data
   * @returns Observable containing the password reset response
   */
  resetPassword(requestModel: PasswordResetRequest): Observable<Response<void>> {
    const url = `${this.baseUrl}${Endpoints.PasswordReset}`;
    return this.httpClient.post<Response<void>>(url, requestModel);
  }

  deleteAccount(): Observable<Response<void>> {
    const url = `${this.baseUrl}${Endpoints.DeleteAccount}`;
    return this.httpClient.delete<Response<void>>(url);
  }

  changePassword(reuqestData: PasswordChangeRequestMomdel): Observable<Response<void>> {
    const url = `${this.baseUrl}${Endpoints.PasswordChange}`;
    return this.httpClient.post<Response<void>>(url, reuqestData);
  }
}
