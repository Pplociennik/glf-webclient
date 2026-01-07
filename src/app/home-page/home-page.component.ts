import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { UserTokenManagementService } from '../services/user-token-management-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth-service';

/**
 * Landing page component for unauthenticated users.
 * Automatically redirects authenticated users to the dashboard.
 */
@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    private router: Router,
    private userTokenService: UserTokenManagementService,
    private authService: AuthService
  ) {
    const userTokenValid = this.userTokenService.isStillValid();
    const userToken = this.userTokenService.getStoredAccessToken();

    if (userToken === '') {
      return;
    }

    if (!userTokenValid) {
      const result = this.authService.refreshUserSession(userToken).subscribe({
        next: (response) => {
          this.userTokenService.revalidateAuthentication(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          return;
        },
      });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Navigates to the login page.
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * Navigates to the registration page.
   */
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
