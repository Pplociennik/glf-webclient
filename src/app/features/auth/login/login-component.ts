import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../../../shared/components/nav-bar-component/nav-bar-component';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../../services/auth/auth-service';
import { LoginModel } from '../../../shared/models/auth/authentication-request-model';
import { FormsModule } from '@angular/forms';
import { UserTokenManagementService } from '../../../services/user-token-management-service.ts.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [TranslocoModule, RouterLink, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  @Input() email!: string;
  @Input() password!: string;
  showPassword: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  buttonActive: boolean = true;

  constructor(
    private router: Router,
    private translocoService: TranslocoService,
    private authService: AuthService,
    private userTokenService: UserTokenManagementService
  ) {
    this.userTokenService.getStoredAccessToken;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.buttonActive = false;
    const loginData: LoginModel = {
      username: this.email,
      password: this.password,
      details: {
        location: '',
        deviceName: '',
      },
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.userTokenService.revalidateToken(response.tokenInfo);
        this.buttonActive = true;

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = error.errorMessage || error.error.errorMessage;
        this.email = '';
        this.password = '';
        this.buttonActive = true;
      },
    });
  }
}
