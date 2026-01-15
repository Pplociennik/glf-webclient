/**
 * Additional authentication details for security tracking.
 * Captures client device and location information during login.
 */
export interface AuthDetails {
  location: string;
  deviceName: string;
}

/**
 * Data transfer object for user login requests.
 * Contains credentials and device information for authentication.
 */
export interface LoginModel {
  email: string;
  password: string;
  details: AuthDetails;
}
