import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from '../../../services/system/lang/language-service';

/**
 * URLs that should not have the language header attached.
 * Includes Keycloak, translation files, and external APIs.
 */
const EXCLUDED_URLS: string[] = [
  '/realms/goaleaf/protocol/openid-connect/token',
  '/assets/i18n/',
  'ipapi.co',
];

/**
 * Checks if the given request URL should be excluded from language header attachment.
 * @param request - The HTTP request to check
 * @returns True if the request URL is in the exclusion list
 */
function isExcluded(request: HttpRequest<unknown>): boolean {
  return EXCLUDED_URLS.some((url) => request.url.includes(url));
}

/**
 * HTTP interceptor that appends the current language to outgoing requests.
 * Adds the 'Accept-Language' header with the user's selected language code.
 * Skips Keycloak requests, translation files, and external APIs.
 * @param request - The outgoing HTTP request
 * @param next - The next handler in the interceptor chain
 * @returns The HTTP response observable from the next handler
 */
export function LanguageInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  if (isExcluded(request)) {
    return next(request);
  }

  const currentLanguage = inject(LanguageService).getCurrentLanguage();
  const updatedRequest = request.clone({
    headers: request.headers.set('Accept-Language', currentLanguage),
  });

  return next(updatedRequest);
}
