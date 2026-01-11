import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { UserTokenManagementService } from '../services/user-token-management-service.ts.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth-service';

@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.scss',
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
          this.userTokenService.revalidateToken(response.tokenInfo);
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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
