import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordInputValidator {

  validatePasswordMinimumLength(password: string): boolean {
    return password.length >= 8;
  }

  validatePasswordMaximumLength(password: string): boolean {
    return password.length <= 256;
  }

  validateAtLeastOneUppercaseLetter(password: string): boolean {
    const regex = /[A-Z]/;
    return regex.test(password);
  }

  validateAtLeastOneLowercaseLetter(password: string): boolean {
    const regex = /[a-z]/;
    return regex.test(password);
  }

  validateAtLeastOneNumber(password: string): boolean {
    const regex = /[0-9]/;
    return regex.test(password);
  }

  validateAtLeastOneSpecialCharacter(password: string): boolean {
    const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    return regex.test(password);
  }

}
