import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { UserTokenManagementService } from '../services/user-token-management-service.ts.service';

@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.scss',
})
export class HomePageComponent {
  constructor(private router: Router, private userTokenService: UserTokenManagementService) {
    const userLoggedIn = this.userTokenService.isStillValid();

    if (userLoggedIn) {
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
