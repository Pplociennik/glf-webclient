import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientTokenManagementService } from '../auth/client-token-management.service';
import { UserTokenManagementService } from '../user-token-management-service';
import { environment } from '../../../environments/environment';
import { ApiPaths } from '../../enums/ApiPaths';
import { PasswordResetRequest } from '../../shared/models/auth/password-reset-request';
import { from, Observable, switchMap } from 'rxjs';
import { Response } from '../../shared/models/response/Response';

/**
 * Service for account management operations.
 * Handles password reset and other account-related API requests.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private baseUrl = `${environment.baseUrl}${ApiPaths.Accounts}`;

  constructor(
    private httpClient: HttpClient,
    private clientTokenService: ClientTokenManagementService,
    private userTokenService: UserTokenManagementService
  ) {}

  /**
   * Initiates a password reset request for the user.
   * @param requestModel - Password reset request data
   * @returns Observable containing the password reset response
   */
  resetPassword(requestModel: PasswordResetRequest): Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.passwordReset}`;

    return from(this.clientTokenService.ensureValidToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.httpClient.post<Response<void>>(url, requestModel, { headers });
      })
    );
  }
}
