import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthService } from '../../../services/auth/auth-service';
import { PasswordResetRequest } from '../../../shared/models/auth/password-reset-request';
import { AccountsService } from '../../../services/accounts/accounts-service';
import { OperationInfoBarComponent } from '../../../shared/components/info/operation-info-bar/operation-info-bar.component';

/**
 * Component for handling password reset requests.
 * Allows users to request a password reset email by providing their email address.
 */
@Component({
  selector: 'app-password-reset-component',
  standalone: true,
  imports: [FormsModule, TranslocoModule, OperationInfoBarComponent],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent {
  @Input() email!: string;
  requestSent: boolean = false;
  btnDisabled: boolean = true;

  showError: boolean = false;
  errorMessage: string = '';

  constructor(private accountsService: AccountsService) {}

  /**
   * Validates the email input and updates the isInputEmpty state.
   */
  checkInput() {
    this.btnDisabled = !this.email;
  }

  /**
   * Submits the password reset request to the backend.
   * On success, sets requestSent flag to show confirmation message.
   */
  onSubmit(): void {
    this.btnDisabled = true;
    const requestData: PasswordResetRequest = {
      email: this.email,
    };

    this.accountsService.resetPassword(requestData).subscribe({
      next: (response) => {
        this.requestSent = true;
        this.btnDisabled = false;
      },
      error: (error) => {
        this.errorMessage = error.errorMessage || error.error.errorMessage;
        this.showError = true;
        this.btnDisabled = false;
      },
    });
  }
}
