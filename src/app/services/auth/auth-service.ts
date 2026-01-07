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

  baseUrl = `${environment.baseUrl}${ApiPaths.Auth}`;
  clientAuthToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOdEotdWdMdXlmVDYwYTFRS3FSS1czeVBhZ2RnV1BGVldCV0cxUldwVWlRIn0.eyJleHAiOjE3Njc4MjIwNDIsImlhdCI6MTc2NzgyMTc0MiwianRpIjoidHJydGNjOjVjNmJkMDQwLTkzODgtNzdlYi0wNjgzLTdlMzdkMThlNTc0NCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzA4MC9yZWFsbXMvZ29hbGVhZiIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiJmY2E5M2M3Mi0zMDdhLTRhZjMtYTFjMy0xOWEyOWJmMjRmOGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnb2FsZWFmX3Rlc3RfcG9zdG1hbl9jbGllbnQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJBQ0NPVU5UUyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWdvYWxlYWYiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImdvYWxlYWZfdGVzdF9wb3N0bWFuX2NsaWVudCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImNsaWVudEhvc3QiOiIxNzIuMTkuMC4xIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtZ29hbGVhZl90ZXN0X3Bvc3RtYW5fY2xpZW50IiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xOS4wLjEiLCJjbGllbnRfaWQiOiJnb2FsZWFmX3Rlc3RfcG9zdG1hbl9jbGllbnQifQ.g-eK6yIu-684GKFeSXHI5gDEEYS8XrShtxWx1ZLQ1Vr-bue0cfY8LkPkgWGGSr-tPO8vm_XtGAqmbq7XGzxqzbUNAeUV6OGPivn6YziXmQERTleGO8Jb0srIBLvSdtPZ3tzcb1GDh-oVilrzp2UMoZjmJiU0nTxBF7yJVX--Zzt4sEoH8XOMSTT0nLr1UaiSQ-loj2GbHBp2TD3OhED8dRtJt13MAKglOTW6KCOdVMikEOQyx2sn9XqK3vZkyZgBNUnmy7496uaPsyU-X0U1bAx2XTlDPdpfeTYkESpdz5_ZfOaGDPe_o7lR4G70FSUc4wjV3JY0M0E-XwfaOaHHRw';

  constructor(private httpClient : HttpClient) {

  }

  register(registrationModel : RegistrationModel) : Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.register}`;
    const headers = new HttpHeaders({
      'Authorization' : this.clientAuthToken
    })

    return this.httpClient.post<Response<void>>(url, registrationModel, {headers})
  }

  login(authRequestModel : LoginModel) : Observable<Response<void>> {
    const url = `${this.baseUrl}${environment.endpoints.login}`;
    const headers = new HttpHeaders({
      'Authorization' : this.clientAuthToken
    })

    return this.httpClient.post<Response<void>>(url, authRequestModel, {headers});
  }

}
