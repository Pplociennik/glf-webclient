import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SuccessAlertComponent } from '../../shared/components/alert/success/success-alert.component';
import { ErrorAlertComponent } from '../../shared/components/alert/error/error-alert.component';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor() {}

  openSuccessAlert(text: string) {
    this._snackBar.openFromComponent(SuccessAlertComponent, {
      data: { text },
      panelClass: 'success-snackbar-panel',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openErrorAlert(text: string) {
    this._snackBar.openFromComponent(ErrorAlertComponent, {
      data: { text },
      panelClass: 'error-snackbar-panel',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
