/**
 * Docker environment configuration.
 * Used when the webclient runs inside the Docker network alongside other services.
 * Use baseUrl + ApiPaths + Endpoints to build full API URLs.
 *
 * Example: ${baseUrl}${ApiPaths.Auth}${Endpoints.Login}
 * Result: http://glf-api-gateway:8072/glf-accounts/api/auth/login
 */
export const environment = {
  production: true,
  baseUrl: 'http://localhost:8072', // API Gateway (host-mapped port)
  keycloakUrl: 'http://localhost:7080', // Keycloak (host-mapped port)
  keycloakClientId: 'goaleaf_angular_client',
  keycloakClientSecret: 'rJa4URTFTj1xTKip77UxjUHKmidLu8O9',
  keycloakGrantType: 'client_credentials',
  keycloakScope: 'openid email profile roles service_account',
};
