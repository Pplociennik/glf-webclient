import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../../services/lang/language-service';

@Component({
  selector: 'app-language-switcher-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './language-switcher-component.html',
  styleUrl: './language-switcher-component.scss'
})
export class LanguageSwitcherComponent {
  @Output() languageChange = new EventEmitter<string>();
  selectedLanguage: string = 'en';

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }

  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.languageService.switchLanguage(select.value);
    this.languageChange.emit(select.value);
  }
}
