import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-reset-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password-reset-component.html',
  styleUrl: './password-reset-component.scss'
})
export class PasswordResetComponent {
  @Input() email!: string;
  requestSent: boolean = false;
  isInputEmpty: boolean = true;

  sendResetLink() {
    this.requestSent = true;
  }

  checkInput() {
    this.isInputEmpty = !this.email;
  }
}
