import { Component } from '@angular/core';
import { NavBarComponent } from "../../../shared/components/nav-bar-component/nav-bar-component";
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [TranslocoModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {
  showPassword: boolean = false;
  constructor(private router: Router, private translocoService: TranslocoService) { }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
