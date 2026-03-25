import { Injectable } from '@angular/core';
import {
  AccountAlreadyVerifiedStrategy,
  ClearSessionDataAndReloginStrategy,
  ClearUserSessionDataStrategy,
  VerifyUserEmailStrategy,
} from './strategy/action-execution.strategy';
import { ErrorResponse } from '../../shared/models/response/error-response.model';
import { DialogService } from '../gui/dialog.service';
import { ResponseActionKeys } from '../../enums/ResponseActionKeys';
import { Response } from '../../shared/models/response/response.model';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class ResponseActionService {
  constructor(
    private verifyUserEmailStrategy: VerifyUserEmailStrategy,
    private clearUserSessionDataStrategy: ClearUserSessionDataStrategy,
    private clearSessionDataAndReloginStrategy: ClearSessionDataAndReloginStrategy,
    private accountAlreadyVerifiedStrategy: AccountAlreadyVerifiedStrategy,
  ) {}

  executeAction(data: unknown, actionKey: string) {
    switch (actionKey) {
      case ResponseActionKeys.VERIFY_USER_EMAIL: {
        const typedData = data as ErrorResponse<string>;
        this.verifyUserEmailStrategy.execute(typedData);
        break;
      }
      case ResponseActionKeys.CLEAR_USER_SESSION_DATA: {
        const typedData = data as Response<void>;
        this.clearUserSessionDataStrategy.execute(typedData);
        break;
      }
      case ResponseActionKeys.USER_PASSWORD_CHANGED: {
        const typedData = data as Response<void>;
        this.clearSessionDataAndReloginStrategy.execute(typedData);
        break;
      }
      case ResponseActionKeys.ACCOUNT_ALREADY_VERIFIED: {
        const typedData = data as ErrorResponse<void>;
        this.accountAlreadyVerifiedStrategy.execute(typedData);
        break;
      }
    }
  }
}
