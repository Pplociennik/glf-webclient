import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-reset-component',
  standalone: true,
  imports: [],
  templateUrl: './password-reset-component.html',
  styleUrl: './password-reset-component.scss'
})
export class PasswordResetComponent {
  @Input() email!: string;
  requestSent: boolean = false;

  sendResetLink() {
    this.requestSent = true;
  }
}
