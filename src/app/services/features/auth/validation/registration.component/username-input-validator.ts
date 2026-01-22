import { Injectable } from '@angular/core';

/**
 * Service for validating username input against format requirements.
 * Ensures usernames meet length and character restrictions.
 */
@Injectable({
  providedIn: 'root'
})
export class UsernameInputValidator {

  /**
   * Validates that the username has at least 3 characters.
   * @param username - The username string to validate
   * @returns True if the username meets minimum length requirement
   */
  validateUsernameMinimumLength(username: string): boolean {
    return username.length >= 3;
  }

  /**
   * Validates that the username does not exceed 20 characters.
   * @param username - The username string to validate
   * @returns True if the username meets maximum length requirement
   */
  validateUsernameMaximumLength(username: string): boolean {
    return username.length <= 20;
  }

  /**
   * Validates that the username contains only alphanumeric characters and underscores.
   * @param username - The username string to validate
   * @returns True if the username contains only valid characters
   */
  validateUsernameCharacters(username: string): boolean {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
  }

}
