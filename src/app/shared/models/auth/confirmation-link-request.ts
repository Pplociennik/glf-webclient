/**
 * Request payload for resending email confirmation links.
 * Used when a user needs a new verification email.
 */
export interface ConfirmationLinkRequest {
    email : string;
}