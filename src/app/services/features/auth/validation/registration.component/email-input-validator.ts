import { Injectable } from '@angular/core';

/**
 * Service for validating email input format.
 * Used in registration and login forms to ensure valid email addresses.
 */
@Injectable({
  providedIn: 'root'
})
export class EmailInputValidator {

  /**
   * Validates that the email matches a standard email format.
   * @param email - The email string to validate
   * @returns True if the email format is valid
   */
  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

}
