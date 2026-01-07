import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { PasswordResetComponent } from './features/auth/password-reset/password-reset.component';
import { DashboardComponent } from './features/dashboard.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

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
];
