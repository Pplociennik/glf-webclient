import { Injectable } from '@angular/core';
import {
  ActionExecutionStrategy,
  VerifyUserEmailStrategy,
} from './strategy/action-execution.strategy';
import { ErrorResponse } from '../../shared/models/response/error-response.model';
import { DialogService } from '../gui/dialog.service';
import { ResponseActionKeys } from '../../enums/ResponseActionKeys';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class ResponseActionService {
  constructor(private verifyUserEmailStrategy: VerifyUserEmailStrategy) {}

  executeAction(data: ErrorResponse<string>, actionKey: string) {
    switch (actionKey) {
      case ResponseActionKeys.VERIFY_USER_EMAIL: {
        this.verifyUserEmailStrategy.execute(data);
        break;
      }
    }
  }
}
