import { Component } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-account-management',
  imports: [TranslocoModule, RouterOutlet, RouterLinkWithHref, RouterLinkActive, MatSidenavModule],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss',
})
export class AccountManagementComponent {}
