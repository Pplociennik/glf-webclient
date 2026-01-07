import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegistrationModel } from "../../shared/models/auth/registration-model";
import { Response } from "../../shared/models/response/Response";
import { environment } from "../../../environments/environment";
import { ApiPaths } from "../../enums/ApiPaths";
import { Observable } from "rxjs";
import { LoginModel } from "../../shared/models/auth/authentication-request-model";

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.baseUrl}/${ApiPaths.Auth}`;
  clientAuthToken = '';
  
  constructor(private httpClient : HttpClient) {
    
  }

  register(registrationModel : RegistrationModel) : Observable<Response<void>> {
    const url = `${this.baseUrl}/${environment.endpoints.register}`;
    const headers = new HttpHeaders({
      'Authorization' : this.clientAuthToken
    })

    return this.httpClient.post<Response<void>>(url, registrationModel, {headers})
  }

  login(authRequestModel : LoginModel) : Observable<Response<void>> {
    const url = `${this.baseUrl}/${environment.endpoints.login}`;
    const headers = new HttpHeaders({
      'Authorization' : this.clientAuthToken
    })

    return this.httpClient.post<Response<void>>(url, authRequestModel, {headers});
  }

}
