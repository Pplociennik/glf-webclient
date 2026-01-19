import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTokenManagementService } from '../../../services/user-token-management-service';

/**
 * URLs that should not have the user token attached.
 * Includes public endpoints, Keycloak, translation files, and external APIs.
 */
const EXCLUDED_URLS: string[] = [
  '/glf-accounts/api/auth/register',
  '/glf-accounts/api/auth/login',
  '/glf-accounts/api/accounts/password/reset',
  '/realms/goaleaf/protocol/openid-connect/token',
  '/assets/i18n/',
  'ipapi.co',
];

/**
 * Checks if the given request URL matches any of the excluded endpoints
 * that should not have the authentication token attached.
 * @param request - The HTTP request to check
 * @returns True if the request URL is in the exclusion list, false otherwise
 */
function isExcluded(request: HttpRequest<unknown>): boolean {
  return EXCLUDED_URLS.some((url) => request.url.includes(url));
}

/**
 * HTTP interceptor that attaches the user authentication token to outgoing requests.
 * Retrieves the stored access token and adds it as a 'User-Token' header with Bearer scheme.
 * Skips requests to public endpoints, Keycloak, and external APIs.
 * @param request - The outgoing HTTP request
 * @param next - The next handler in the interceptor chain
 * @returns The HTTP event observable from the next handler
 */
export function UserAuthInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (isExcluded(request)) {
    return next(request);
  }

  const userToken = inject(UserTokenManagementService).getStoredAccessToken();

  if (!userToken) {
    return next(request);
  }

  const updatedRequest = request.clone({
    headers: request.headers.set('User-Token', userToken),
  });

  return next(updatedRequest);
}
