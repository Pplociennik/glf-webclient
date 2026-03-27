import { Injectable } from '@angular/core';
import { ErrorResponse } from '../../../shared/models/response/error-response.model';
import { DialogService } from '../../gui/dialog.service';
import { Response } from '../../../shared/models/response/response.model';
import { UserTokenManagementService } from '../../user-token-management-service';
import { Router } from '@angular/router';
import { AlertService } from '../../gui/alert.service';
import { TranslocoService } from '@ngneat/transloco';

export interface ActionExecutionStrategy<T> {
  execute(data: T): void;
}

@Injectable({
  providedIn: 'root',
})
export class VerifyUserEmailStrategy implements ActionExecutionStrategy<ErrorResponse<string>> {
  constructor(private dialogService: DialogService) {}

  execute(data: ErrorResponse<string>): void {
    const emailAddress = data.responseData?.at(0);
    if (emailAddress) {
      this.dialogService.openUnverifiedUserDialog(emailAddress);
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class LogoutUserExplicitlyStrategy implements ActionExecutionStrategy<ErrorResponse<void>> {
  constructor(
    private userTokenService: UserTokenManagementService,
    private router: Router,
    private alertService: AlertService,
    private translocoService: TranslocoService,
  ) {}

  execute(data: ErrorResponse<void>): void {
    this.userTokenService.clearToken();
    this.router.navigate(['/']);

    const message = this.translocoService.translate(
      'accountManagement.accountSecurity.alerts.userLoggedOutExplicitly',
    );
    this.alertService.openErrorAlert(message);
  }
}

@Injectable({
  providedIn: 'root',
})
export class LogoutUserImplicitlyStrategy implements ActionExecutionStrategy<Response<void>> {
  constructor(
    private userTokenService: UserTokenManagementService,
    private router: Router,
    private alertService: AlertService,
    private translocoService: TranslocoService,
  ) {}

  execute(data: Response<void>): void {
    this.userTokenService.clearToken();
    this.router.navigate(['/']);

    const message = this.translocoService.translate(
      'accountManagement.accountSecurity.alerts.userLoggedOutImplicitly',
    );
    this.alertService.openSuccessAlert(message);
  }
}

@Injectable({
  providedIn: 'root',
})
export class AccountAlreadyVerifiedStrategy implements ActionExecutionStrategy<
  ErrorResponse<void>
> {
  constructor(
    private router: Router,
    private alertService: AlertService,
  ) {}

  execute(data: ErrorResponse<void>): void {
    const errorMessage = data.errorMessage;
    this.router.navigate(['/']);
    this.alertService.openErrorAlert(errorMessage);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CloseOtherUserSessionStrategy implements ActionExecutionStrategy<Response<void>> {
  constructor(
    private alertService: AlertService,
    private translocoService: TranslocoService,
  ) {}

  execute(data: Response<void>): void {
    const message = this.translocoService.translate(
      'accountManagement.accountSecurity.alerts.otherUserSessionClosed',
    );
    this.alertService.openSuccessAlert(message);
  }
}
