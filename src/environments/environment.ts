/**
 * Development environment configuration.
 * Use baseUrl + ApiPaths + Endpoints to build full API URLs.
 *
 * Example: ${baseUrl}${ApiPaths.Auth}${Endpoints.Login}
 * Result: http://localhost:8072/glf-accounts/api/auth/login
 */
export const environment = {
  production: false,
  baseUrl: 'http://localhost:8072', // Development API Gateway URL
  keycloakUrl: 'http://localhost:7080',
  keycloakClientId: 'goaleaf_angular_client',
  keycloakClientSecret: 'rJa4URTFTj1xTKip77UxjUHKmidLu8O9',
  keycloakGrantType: 'client_credentials',
  keycloakScope: 'openid email profile roles service_account',
};
