import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserTokenManagementService } from '../../../services/user-token-management-service';
import { Response, ResponseData } from '../../../shared/models/response/Response';

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

/**
 * HTTP interceptor that handles successful responses and revalidates user authentication.
 * Extracts authentication tokens from response bodies and updates the user session.
 * Skips Keycloak requests, translation files, and external APIs.
 * @param request - The outgoing HTTP request
 * @param next - The next handler in the interceptor chain
 * @returns Observable of the HTTP event stream
 */
export function SuccessfulResponseInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (isExcluded(request)) {
    return next(request);
  }

  const tokenService = inject(UserTokenManagementService);

  return next(request).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.body) {
        tokenService.revalidateAuthentication(event.body as Response<ResponseData>);
      }
    })
  );
}
