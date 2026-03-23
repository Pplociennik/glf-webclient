/**
 * API paths to REST controllers.
 * These paths correspond to @RequestMapping values in backend controllers.
 * Use with environment.baseUrl and Endpoints to build full URLs.
 *
 * Example: ${environment.baseUrl}${ApiPaths.Auth}${Endpoints.Login}
 * Result: http://localhost:8072/glf-accounts/api/auth/login
 */
export enum ApiPaths {
  // glf-accounts service - AuthenticationController
  Auth = '/glf-accounts/api/auth',

  // glf-accounts service - AccountManagementController
  Accounts = '/glf-accounts/api/accounts',

  // glf-accounts service - UserDetailsController
  Users = '/glf-accounts/api/users',

  // glf-communities service - CommunityController
  Communities = '/glf-communities/api/communities',

  Sessions = '/glf-accounts/api/sessions',
}
