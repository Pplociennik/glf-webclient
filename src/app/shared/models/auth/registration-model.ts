/**
 * Represents user credentials for authentication.
 * Used within RegistrationModel to specify password information.
 */
export interface CredentialsModel {
    value: string;
    temporary: boolean;
}

/**
 * Data transfer object for user registration requests.
 * Contains all required information to create a new user account.
 */
export interface RegistrationModel {
    email : String;
    username : String;
    enabled : boolean;
    credentials : CredentialsModel[]
}