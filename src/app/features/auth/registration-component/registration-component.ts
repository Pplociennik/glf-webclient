import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-component',
  standalone: true,
  imports: [],
  templateUrl: './registration-component.html',
  styleUrl: './registration-component.scss'
})
export class RegistrationComponent {
  showPassword = false;
  showConfirmPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
