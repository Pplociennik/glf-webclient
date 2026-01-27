import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { ClientAuthInterceptor } from './core/interceptors/request/client-auth.interceptor';
import { UserAuthInterceptor } from './core/interceptors/request/user-auth.interceptor';
import { LanguageInterceptor } from './core/interceptors/request/language.interceptor';
import { SuccessfulResponseInterceptor } from './core/interceptors/response/successful-response.interceptor';
import { ErrorResponseInterceptor } from './core/interceptors/response/error-response.interceptor';

/**
 * Application configuration with providers for routing, HTTP, and i18n.
 * Configures Transloco with supported languages: en, pl, de, szl.
 * Registers HTTP interceptors for authentication, language, and response handling.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        ClientAuthInterceptor,
        UserAuthInterceptor,
        LanguageInterceptor,
        ErrorResponseInterceptor,
        SuccessfulResponseInterceptor,
      ]),
    ),
    provideTransloco({
      config: {
        availableLangs: ['en', 'pl', 'de', 'szl'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
