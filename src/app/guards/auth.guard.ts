import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserTokenManagementService } from '../services/user-token-management-service';

/**
 * Guard that protects routes requiring authentication.
 * Redirects unauthenticated users to the login page.
 * Use this for protected pages like dashboard, profile, etc.
 */
export const authGuard: CanActivateFn = () => {
  const userTokenService = inject(UserTokenManagementService);
  const router = inject(Router);

  const hasToken = userTokenService.getStoredAccessToken() !== '';
  const isValid = userTokenService.isStillValid();

  if (hasToken && isValid) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
