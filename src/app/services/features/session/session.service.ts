import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../../shared/models/response/response.model';
import { UserSession } from '../../../shared/models/session/user-session-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiPaths } from '../../../enums/ApiPaths';
import { Endpoints } from '../../../enums/Endpoints';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private baseUrl = `${environment.baseUrl}${ApiPaths.Sessions}`;

  constructor(private httpClient: HttpClient) {}

  getAllUserSessions(): Observable<Response<UserSession>> {
    const url = `${this.baseUrl}${Endpoints.AllUserSessions}`;
    return this.httpClient.get<Response<UserSession>>(url);
  }
}
