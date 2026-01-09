export interface CredentialsModel {
    value: string;
    temporary: boolean;
}

export interface RegistrationModel {
    email : String;
    username : String;
    enabled : boolean;
    credentials : CredentialsModel[]
}