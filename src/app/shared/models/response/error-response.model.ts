export interface ErrorResponse<T> {
  apiPath: string;
  errorCode: string;
  errorMessage: string;
  errorTime: string;
  serverEventFlag: string;
  responseData?: T[];
}
