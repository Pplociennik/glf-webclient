export interface StatusInfo {
  statusCode: number;
  message: string;
}

export interface TokenInfo {
  refreshed: boolean;
  accessToken: string;
  expiresIn: number;
}

export interface Response<T> {
  statusInfo: StatusInfo;
  data?: T;
  tokenInfo: TokenInfo;
}
