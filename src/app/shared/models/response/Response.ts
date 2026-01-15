export interface ResponseData {
  username: string;
}

/**
 * HTTP response status information from backend services.
 * Contains status code and message for error handling.
 */
export interface StatusInfo {
  statusCode: string;
  statusMsg: string;
}

/**
 * User token information included in API responses.
 * Used to refresh client-side tokens when the server issues new ones.
 */
export interface TokenInfo {
  refreshed: boolean;
  accessToken: string;
  expiresIn: number;
}

/**
 * Generic wrapper for all API responses from backend services.
 * Provides consistent structure with status, data, and token information.
 */
export interface Response<T> {
  statusInfo: StatusInfo;
  responseData?: T[];
  tokenInfo: TokenInfo;
}
