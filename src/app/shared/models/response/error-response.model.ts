export interface ErrorResponse<T> {
  apiPath: string;
  errorCode: string;
  errorMessage: string;
  errorTime: string;
  clientActionFlag: string;
  responseData?: T[];
}
