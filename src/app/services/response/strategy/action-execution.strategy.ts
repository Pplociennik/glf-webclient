import { Injectable } from '@angular/core';
import { ErrorResponse } from '../../../shared/models/response/error-response.model';
import { DialogService } from '../../gui/dialog.service';

export interface ActionExecutionStrategy {
  execute(data: ErrorResponse<string>): void;
}

@Injectable({
  providedIn: 'root',
})
export class VerifyUserEmailStrategy implements ActionExecutionStrategy {
  constructor(private dialogService: DialogService) {}

  execute(data: ErrorResponse<string>): void {
    const emailAddress = data.responseData?.at(0);
    if (emailAddress) {
      this.dialogService.openUnverifiedUserDialog(emailAddress);
    }
  }
}
