import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

/**
 * Landing page component for unauthenticated users.
 * Route is protected by guestGuard which redirects authenticated users to dashboard.
 */
@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private router: Router) {}

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
