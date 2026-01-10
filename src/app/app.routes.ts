import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login-component';
import { HomePageComponent } from './home-page/home-page-component';
import { RegistrationComponent } from './features/auth/registration/registration-component';
import { PasswordResetComponent } from './features/auth//password-reset/password-reset-component';
import { DashboardComponent } from './features/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
