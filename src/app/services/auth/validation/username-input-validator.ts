import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameInputValidator {

  validateUsernameMinimumLength(username: string): boolean {
    return username.length >= 3;
  }

  validateUsernameMaximumLength(username: string): boolean {
    return username.length <= 20;
  }

  validateUsernameCharacters(username: string): boolean {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
  }

}
