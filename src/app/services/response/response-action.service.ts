import { Injectable } from '@angular/core';
import {
  AccountAlreadyVerifiedStrategy,
  CloseOtherUserSessionStrategy,
  LogoutUserExplicitlyStrategy,
  LogoutUserImplicitlyStrategy,
  VerifyUserEmailStrategy,
} from './strategy/action-execution.strategy';
import { ErrorResponse } from '../../shared/models/response/error-response.model';
import { DialogService } from '../gui/dialog.service';
import { ServerEventResponseKey } from '../../enums/ServerEventResponseKeys';
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
    private implicitLogoutStrategy: LogoutUserImplicitlyStrategy,
    private explicitLogoutStrategy: LogoutUserExplicitlyStrategy,
    private accountAlreadyVerifiedStrategy: AccountAlreadyVerifiedStrategy,
    private closeOtherUserSessionStrategy: CloseOtherUserSessionStrategy,
  ) {}

  executeAction(data: unknown, actionKey: string) {
    switch (actionKey) {
      case ServerEventResponseKey.USER_EMAIL_NOT_VERIFIED: {
        const typedData = data as ErrorResponse<string>;
        this.verifyUserEmailStrategy.execute(typedData);
        break;
      }
      case ServerEventResponseKey.CURRENT_SESSION_CLOSED_BY_USER_EXPLICITLY: {
        const typedData = data as ErrorResponse<void>;
        this.explicitLogoutStrategy.execute(typedData);
        break;
      }
      case ServerEventResponseKey.CURRENT_SESSION_CLOSED_BY_USER_IMPLICITLY: {
        const typedData = data as Response<void>;
        this.implicitLogoutStrategy.execute(typedData);
        break;
      }
      case ServerEventResponseKey.USER_EMAIL_ALREADY_VERIFIED: {
        const typedData = data as ErrorResponse<void>;
        this.accountAlreadyVerifiedStrategy.execute(typedData);
        break;
      }
      case ServerEventResponseKey.OTHER_USER_SESSION_CLOSED_BY_USER: {
        const typedData = data as Response<void>;
        this.closeOtherUserSessionStrategy.execute(typedData);
        break;
      }
    }
  }
}
