import { Component, inject } from '@angular/core';
import { ConfirmationLinkRequestComponent } from '../../../../features/auth/confirmation-link-request/confirmation-link-request/confirmation-link-request';
import { TranslocoModule } from '@ngneat/transloco';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-unverified-user-dialog',
  templateUrl: './unverified-user-dialog.component.html',
  styleUrls: ['./unverified-user-dialog.component.scss'],
  imports: [
    ConfirmationLinkRequestComponent,
    TranslocoModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
})
export class UnverifiedUserDialogComponent {
  data = inject<{ emailAddress: string }>(MAT_DIALOG_DATA);
}
