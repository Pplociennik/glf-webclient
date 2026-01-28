/**
 * Endpoint paths from REST controller methods.
 * These paths correspond to controller method endpoints (@GetMapping, @PostMapping, etc.)
 * Values are the exact paths from controller annotations.
 *
 * Use with environment.baseUrl and ApiPaths to build full URLs.
 * Example: ${environment.baseUrl}${ApiPaths.Auth}${Endpoints.Login}
 * Result: http://localhost:8072/glf-accounts/api/auth/login
 */
export enum Endpoints {
  KeycloakClientAuth = '/realms/goaleaf/protocol/openid-connect/token',

  // AuthenticationController (/glf-accounts/api/auth)
  Login = '/login',
  Register = '/register',
  SessionRefresh = '/session/refresh',
  LogoutAll = '/logout/all',
  Logout = '/logout',
  LogoutSession = '/logout-session',

  // AccountManagementController (/glf-accounts/api/accounts)
  EmailConfirmationRequest = '/email-confirmation/request',
  EmailConfirm = '/confirm',
  PasswordReset = '/password/reset',
  PasswordChange = '/password/change',
  DeleteAccount = '/delete',

  // SessionsController (/glf-accounts/api/sessions)
  AllUserSessions = '/all',

  // UserDetailsController (/glf-accounts/api/users)
  // (No endpoints implemented yet)

  // CommunityController (/glf-communities/api/communities)
  CommunityCreate = '/create',
  CommunityFetch = '/community',
  CommunityUpdate = '/update',
  CommunityDelete = '/delete',
}
