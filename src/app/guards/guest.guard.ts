import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserTokenManagementService } from '../services/user-token-management-service';

/**
 * Guard that protects guest-only routes (login, register, password-reset).
 * Redirects authenticated users to the dashboard.
 * Use this to prevent logged-in users from accessing auth pages.
 */
export const guestGuard: CanActivateFn = () => {
  const userTokenService = inject(UserTokenManagementService);
  const router = inject(Router);

  const hasToken = userTokenService.getStoredAccessToken() !== '';
  const isValid = userTokenService.isStillValid();

  if (hasToken && isValid) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
