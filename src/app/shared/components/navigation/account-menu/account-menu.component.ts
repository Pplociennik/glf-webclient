import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth-service';
import { UserTokenManagementService } from '../../../../services/user-token-management-service';
import { Route, Router } from '@angular/router';
import { MatMenuModule, MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { LanguageService } from '../../../../services/lang/language-service';

/**
 * Component that displays the user account dropdown menu.
 * Provides logout functionality and other account-related actions.
 */
@Component({
  selector: 'app-account-menu',
  standalone: true,
  imports: [MatMenuModule, MatIcon, MatButtonModule, TranslocoModule],
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent {
  constructor(
    private authService: AuthService,
    private userTokenService: UserTokenManagementService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  /**
   * Logs out the current user and navigates to the home page.
   * Clears the stored user token on successful logout.
   */
  logoutUser(): void {
    const userAccessToken = this.userTokenService.getStoredAccessToken();

    this.authService.logoutCurrentUserSession(userAccessToken).subscribe({
      next: (response) => {
        this.userTokenService.clearToken();
        this.router.navigate(['/']);
      },
      error: (error) => {
        window.alert('Error!');
      },
    });
  }

  get getUsername(): string {
    return this.userTokenService.getStoredUsername();
  }

  /**
   * Switches the application language to the specified language code.
   * @param language - Language code to switch to (e.g., 'en', 'pl', 'de', 'szl')
   */
  changeLanguage(language: string): void {
    this.languageService.switchLanguage(language);
  }
}
