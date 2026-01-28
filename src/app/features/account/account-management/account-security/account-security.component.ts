import { Component } from '@angular/core';
import { UserSessionsComponent } from './user-sessions/user-sessions.component';
import { MatDividerModule, MatDivider } from '@angular/material/divider';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-account-security',
  imports: [UserSessionsComponent, MatDividerModule, ChangePasswordComponent],
  templateUrl: './account-security.component.html',
  styleUrl: './account-security.component.scss',
})
export class AccountSecurityComponent {}
