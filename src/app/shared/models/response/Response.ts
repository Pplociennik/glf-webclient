  export interface Response<T> {
    statusInfo: StatusInfo;
    data?: T; 
    userTokenRefreshed?: boolean;
    userAccessToken?: string;
  }

  export interface StatusInfo {
    statusCode: number;
    message: string;
  }