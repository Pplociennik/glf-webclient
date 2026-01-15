/**
 * OAuth2 client credentials request payload for Keycloak authentication.
 * Used to obtain client access tokens for service-to-service communication.
 */
export interface ClientAuthRequest {
  grant_type: string;
  client_id: string;
  client_secret: string;
  scope: string;
}
