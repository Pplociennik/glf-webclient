import { Component, inject, Input, Optional } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../services/features/auth/auth-service';
import { ConfirmationLinkRequest } from '../../../../shared/models/auth/confirmation-link-request';
import { ResendButtonComponent } from '../resend-button/resend-button.component';

export interface ConfirmationLinkRequestDialogData {
  titleMessage: string;
  mainMessage: string;
  emailAddress: string;
}

@Component({
  selector: 'app-confirmation-link-request',
  imports: [TranslocoModule, ResendButtonComponent, ResendButtonComponent],
  templateUrl: './confirmation-link-request.html',
  styleUrl: './confirmation-link-request.scss',
})
export class ConfirmationLinkRequestComponent {
  @Input() titleMessage!: string;
  @Input() mainMessage!: string;
  @Input() emailAddress!: string;

  requestSent: boolean = false;

  private dialogData = inject<ConfirmationLinkRequestDialogData>(MAT_DIALOG_DATA, {
    optional: true,
  });

  constructor(private authService: AuthService) {
    if (this.dialogData) {
      this.titleMessage = this.dialogData.titleMessage;
      this.mainMessage = this.dialogData.mainMessage;
      this.emailAddress = this.dialogData.emailAddress;
    }
  }

  onSubmit(): void {
    const requestData: ConfirmationLinkRequest = {
      email: this.emailAddress,
    };

    this.authService.requestConfirmationLink(requestData).subscribe({
      next: (response) => {
        this.requestSent = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
