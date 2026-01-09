export interface AuthDetails {
  location: string;
  deviceName: string;
}

export interface LoginModel {
  username: string;
  password: string;
  details: AuthDetails;
}
