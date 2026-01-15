/**
 * Request payload for initiating a password reset.
 * The backend will send a reset email to the specified address.
 */
export interface PasswordResetRequest {
  email: string;
}
