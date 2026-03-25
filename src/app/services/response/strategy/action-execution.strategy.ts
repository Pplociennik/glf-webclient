import { Injectable } from '@angular/core';
import { ErrorResponse } from '../../../shared/models/response/error-response.model';
import { DialogService } from '../../gui/dialog.service';
import { Response } from '../../../shared/models/response/response.model';
import { UserTokenManagementService } from '../../user-token-management-service';
import { Router } from '@angular/router';
import { AlertService } from '../../gui/alert.service';

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
export class ClearUserSessionDataStrategy implements ActionExecutionStrategy<Response<void>> {
  constructor(
    private userTokenService: UserTokenManagementService,
    private router: Router,
  ) {}

  execute(data: Response<void>): void {
    this.userTokenService.clearToken();
    this.router.navigate(['/']);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClearSessionDataAndReloginStrategy implements ActionExecutionStrategy<Response<void>> {
  constructor(
    private userTokenService: UserTokenManagementService,
    private router: Router,
  ) {}

  execute(data: Response<void>): void {
    this.userTokenService.clearToken();
    this.router.navigate(['/login']);
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
