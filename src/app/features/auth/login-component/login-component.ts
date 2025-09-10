import { Component } from '@angular/core';
import { NavBarComponent } from "../../../shared/components/nav-bar-component/nav-bar-component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {
  showPassword: boolean = false;
  constructor(private router: Router) { }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
