import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

/**
 * Service for managing application language and internationalization.
 * Handles language detection, switching, and persistence via Transloco.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly defaultLanguage: string = 'en';
  private readonly supportedLanguages: string[] = ['en', 'pl', 'de', 'szl'];

  constructor(private translocoService: TranslocoService) {}

  /**
   * Initializes the application language based on browser settings.
   * Falls back to English if the browser language is not supported.
   */
  initializeLanguage(): void {
    const browserLanguage = this.getBrowserLanguage();
    const languageToUse = this.supportedLanguages.includes(browserLanguage)
      ? browserLanguage
      : this.defaultLanguage;

    this.translocoService.setActiveLang(languageToUse);
  }

  /**
   * Extracts the primary language code from browser settings.
   * @returns Two-letter language code (e.g., 'en', 'pl')
   */
  private getBrowserLanguage(): string {
    const browserLanguage = navigator.language || (navigator as any).userLanguage;
    return browserLanguage ? browserLanguage.split('-')[0] : this.defaultLanguage;
  }

  /**
   * Switches the active application language.
   * @param language - Language code to switch to
   */
  switchLanguage(language: string) {
    this.translocoService.setActiveLang(language);
  }

  /**
   * Sets the application language if it is supported.
   * @param lang - Language code to set
   */
  setLanguage(lang: string): void {
    if (this.supportedLanguages.includes(lang)) {
      this.translocoService.setActiveLang(lang);
    }
  }

  /**
   * Returns the currently active language code.
   * @returns Current language code
   */
  getCurrentLanguage(): string {
    return this.translocoService.getActiveLang();
  }
}
