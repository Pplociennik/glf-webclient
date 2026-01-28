import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { PasswordResetComponent } from './features/auth/password-reset/password-reset.component';
import { DashboardComponent } from './features/dashboard.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';
import { ConfirmationLinkRequestComponent } from './features/auth/confirmation-link-request/confirmation-link-request/confirmation-link-request';
import { AccountManagementComponent } from './features/account/account-management/account-management.component';
import { UserDataComponent } from './features/account/account-management/user-data/user-data.component';
import { AccountSecurityComponent } from './features/account/account-management/account-security/account-security.component';
import { SocialComponent } from './features/account/account-management/social/social.component';

/**
 * Application routing configuration.
 * Defines URL paths and their corresponding components.
 *
 * Guards:
 * - guestGuard: Redirects authenticated users to /dashboard (for login, register, password-reset)
 * - authGuard: Redirects unauthenticated users to /login (for protected pages)
 */
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'account',
    component: AccountManagementComponent,
    children: [
      { path: '', redirectTo: 'user-data', pathMatch: 'full' },
      { path: 'user-data', component: UserDataComponent },
      { path: 'security', component: AccountSecurityComponent },
      { path: 'social', component: SocialComponent },
    ],
    canActivate: [authGuard],
  },
];
