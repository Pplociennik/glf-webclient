import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar-component/nav-bar-component';
import { LanguageService } from './services/lang/language-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('goaleaf-client');

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.initializeLanguage();
  }
}
