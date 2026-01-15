import { Injectable } from '@angular/core';

/**
 * Service for validating password input against security requirements.
 * Ensures passwords meet complexity and length requirements.
 */
@Injectable({
  providedIn: 'root'
})
export class PasswordInputValidator {

  /**
   * Validates that the password has at least 8 characters.
   * @param password - The password string to validate
   * @returns True if the password meets minimum length requirement
   */
  validatePasswordMinimumLength(password: string): boolean {
    return password.length >= 8;
  }

  /**
   * Validates that the password does not exceed 256 characters.
   * @param password - The password string to validate
   * @returns True if the password meets maximum length requirement
   */
  validatePasswordMaximumLength(password: string): boolean {
    return password.length <= 256;
  }

  /**
   * Validates that the password contains at least one uppercase letter.
   * @param password - The password string to validate
   * @returns True if the password contains an uppercase letter
   */
  validateAtLeastOneUppercaseLetter(password: string): boolean {
    const regex = /[A-Z]/;
    return regex.test(password);
  }

  /**
   * Validates that the password contains at least one lowercase letter.
   * @param password - The password string to validate
   * @returns True if the password contains a lowercase letter
   */
  validateAtLeastOneLowercaseLetter(password: string): boolean {
    const regex = /[a-z]/;
    return regex.test(password);
  }

  /**
   * Validates that the password contains at least one numeric digit.
   * @param password - The password string to validate
   * @returns True if the password contains a number
   */
  validateAtLeastOneNumber(password: string): boolean {
    const regex = /[0-9]/;
    return regex.test(password);
  }

  /**
   * Validates that the password contains at least one special character.
   * @param password - The password string to validate
   * @returns True if the password contains a special character
   */
  validateAtLeastOneSpecialCharacter(password: string): boolean {
    const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    return regex.test(password);
  }

}
