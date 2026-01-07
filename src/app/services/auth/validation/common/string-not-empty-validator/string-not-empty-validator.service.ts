import { Injectable } from '@angular/core';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class StringNotEmptyValidatorService {
  constructor() {}

  validate(inputValue: string): boolean {
    return inputValue != null && inputValue != '';
  }
}
