import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegistrationModel } from "../../shared/models/auth/registration-model";
import { Response } from "../../shared/models/response/Response";
import { environment } from "../../../environments/environment";
import { ApiPaths } from "../../enums/ApiPaths";
import { from, Observable, switchMap } from "rxjs";
import { LoginModel } from "../../shared/models/auth/authentication-request-model";
import { TokenManagementService } from "./token-management.service";
import { ConfirmationLinkRequest } from "../../shared/models/auth/confirmation-link-request";

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.baseUrl}${ApiPaths.Auth}`;

  constructor(
    private httpClient: HttpClient,
    private tokenManagementService: TokenManagementService
  ) {
    // Eager initialization - fetch token immediately on service creation
    this.tokenManagementService.ensureValidToken().catch(error => {
      console.error('Failed to initialize client token:', error);
    });
  }

  register(registrationModel: RegistrationModel): Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.register}`;

    // Convert Promise to Observable and chain the HTTP request
    return from(this.tokenManagementService.ensureValidToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.httpClient.post<Response<void>>(url, registrationModel, { headers });
      })
    );
  }

  login(authRequestModel: LoginModel): Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.login}`;

    // Convert Promise to Observable and chain the HTTP request
    return from(this.tokenManagementService.ensureValidToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.httpClient.post<Response<void>>(url, authRequestModel, { headers });
      })
    );
  }

  requestConfirmationLink(linkRequestModel : ConfirmationLinkRequest) : Observable<Response<void>> {
        const url = `${this.baseUrl}${environment.endpoints.emailConfirmationRequest}`;

    // Convert Promise to Observable and chain the HTTP request
    return from(this.tokenManagementService.ensureValidToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.httpClient.post<Response<void>>(url, linkRequestModel, { headers });
      })
    );
  }

}
