/**
 * Development environment configuration.
 * Use baseUrl + ApiPaths + endpoints to build full API URLs.
 *
 * Example: ${baseUrl}${ApiPaths.Auth}${endpoints.login}
 * Result: http://localhost:8072/glf-accounts/api/auth/login
 */
export const environment = {
  production: false,
  baseUrl: 'http://localhost:8072', // Development API Gateway URL
  keycloakUrl: 'http://localhost:7080',

  /**
   * Endpoint paths from REST controller methods.
   * Keys correspond to controller method endpoints (@GetMapping, @PostMapping, etc.)
   * Values are the exact paths from controller annotations.
   */
  endpoints: {
    keycloakClientAuth: '/realms/goaleaf/protocol/openid-connect/token',

    // AuthenticationController (/glf-accounts/api/auth)
    login: '/login',
    register: '/register',
    sessionRefresh: '/session/refresh',
    logoutAll: '/logout/all',
    logout: '/logout',
    logoutSession: '/logout-session',

    // AccountManagementController (/glf-accounts/api/accounts)
    emailConfirmationRequest: '/email-confirmation/request',
    emailConfirm: '/confirm',
    passwordReset: '/password/reset',
    passwordChange: '/password/change',

    // UserDetailsController (/glf-accounts/api/users)
    // (No endpoints implemented yet)

    // CommunityController (/glf-communities/api/communities)
    communityCreate: '/create',
    communityFetch: '/community',
    communityUpdate: '/update',
    communityDelete: '/delete',
  },
};
