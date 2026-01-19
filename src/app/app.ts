import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/navigation/nav-bar-component/nav-bar.component';
import { LanguageService } from './services/system/lang/language-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';

/**
 * Root application component.
 * Initializes the application and provides the main layout structure.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('goaleaf-client');

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.initializeLanguage();
  }
}
