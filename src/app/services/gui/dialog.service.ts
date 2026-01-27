import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import {
  ConfirmationLinkRequestComponent,
  ConfirmationLinkRequestDialogData,
} from '../../features/auth/confirmation-link-request/confirmation-link-request/confirmation-link-request';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private transloco: TranslocoService,
  ) {}

  openUnverifiedUserDialog(emailAddress: string) {
    const data: ConfirmationLinkRequestDialogData = {
      titleMessage: this.transloco.translate('confirmationLinkRequestComponent.dialog.titleText'),
      mainMessage: this.transloco.translate('confirmationLinkRequestComponent.dialog.mainText'),
      emailAddress,
    };

    this.dialog.open(ConfirmationLinkRequestComponent, {
      width: '200vw',
      height: '20vh',
      data,
    });
  }
}
