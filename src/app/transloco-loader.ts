import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { HttpClient } from "@angular/common/http";

/**
 * Custom Transloco loader that fetches translation files via HTTP.
 * Loads JSON translation files from the assets/i18n directory.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);

    /**
     * Loads translation file for the specified language.
     * @param lang - Language code (e.g., 'en', 'pl', 'de', 'szl')
     * @returns Observable containing the translation data
     */
    getTranslation(lang: string) {
        return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
    }
}
