import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly defaultLanguage: string = 'en';
  private readonly supportedLanguages: string[] = ['en', 'pl', 'de', 'szl'];

  constructor(private translocoService: TranslocoService) { }

  initializeLanguage(): void {
    const browserLanguage = this.getBrowserLanguage();
    const languageToUse = this.supportedLanguages.includes(browserLanguage)
      ? browserLanguage
      : this.defaultLanguage;

    this.translocoService.setActiveLang(languageToUse);
  }

  private getBrowserLanguage(): string {
    const browserLanguage = navigator.language || (navigator as any).userLanguage;
    return browserLanguage ? browserLanguage.split('-')[0] : this.defaultLanguage;
  }

  switchLanguage(language: string) {
    this.translocoService.setActiveLang(language);
  }

  setLanguage(lang: string): void {
    if (this.supportedLanguages.includes(lang)) {
      this.translocoService.setActiveLang(lang);
    }
  }

  getCurrentLanguage(): string {
    return this.translocoService.getActiveLang();
  }

}
