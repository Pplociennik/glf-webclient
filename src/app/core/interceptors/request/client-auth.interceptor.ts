import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { ClientTokenManagementService } from '../../../services/features/auth/client-token-management.service';

/**
 * URLs that should not have the client Authorization header attached.
 * Includes Keycloak token endpoint, translation files, and external APIs.
 */
const EXCLUDED_URLS: string[] = [
  '/realms/goaleaf/protocol/openid-connect/token',
  '/assets/i18n/',
  'ipapi.co',
];

/**
 * Checks if the given request URL should be excluded from token attachment.
 * @param request - The HTTP request to check
 * @returns True if the request URL is in the exclusion list
 */
function isExcluded(request: HttpRequest<unknown>): boolean {
  return EXCLUDED_URLS.some((url) => request.url.includes(url));
}

/**
 * HTTP interceptor that attaches the client authentication token to outgoing requests.
 * Ensures a valid token is obtained before adding it to the Authorization header.
 * Excludes Keycloak token requests, translation files, and external API calls.
 * @param request - The outgoing HTTP request
 * @param next - The next handler in the interceptor chain
 * @returns Observable of the HTTP event with the authorization header attached
 */
export function ClientAuthInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  if (isExcluded(request)) {
    return next(request);
  }

  const clientTokenService = inject(ClientTokenManagementService);

  return from(clientTokenService.ensureValidToken()).pipe(
    switchMap((token) => {
      const updatedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(updatedRequest);
    }),
  );
}
