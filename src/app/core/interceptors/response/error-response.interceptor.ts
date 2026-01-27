import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { UserTokenManagementService } from '../../../services/user-token-management-service';
import { Response, ResponseData } from '../../../shared/models/response/response.model';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '../../../shared/models/response/error-response.model';
import { ResponseActionService } from '../../../services/response/response-action.service';

/**
 * URLs that should not have token revalidation applied.
 * Includes Keycloak, translation files, and external APIs.
 */
const EXCLUDED_URLS: string[] = [
  '/realms/goaleaf/protocol/openid-connect/token',
  '/assets/i18n/',
  'ipapi.co',
];

/**
 * Checks if the given request URL should be excluded from token revalidation.
 * @param request - The HTTP request to check
 * @returns True if the request URL is in the exclusion list
 */
function isExcluded(request: HttpRequest<unknown>): boolean {
  return EXCLUDED_URLS.some((url) => request.url.includes(url));
}

export function ErrorResponseInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  if (isExcluded(request)) {
    return next(request);
  }

  const actionService = inject(ResponseActionService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorResponse = error.error as ErrorResponse<string> | undefined;
      const actionFlag = errorResponse?.clientActionFlag;

      if (actionFlag) {
        actionService.executeAction(errorResponse!, actionFlag);
      }

      return throwError(() => error);
    }),
  );
}
