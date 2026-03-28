import { Component } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIcon } from '@angular/material/icon';
import { UserTokenManagementService } from '../../../services/user-token-management-service';

@Component({
  selector: 'app-account-management',
  imports: [
    TranslocoModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterLinkActive,
    MatSidenavModule,
    MatIcon,
  ],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss',
})
export class AccountManagementComponent {
  username!: string;

  constructor(
    private router: Router,
    private userTokenService: UserTokenManagementService,
  ) {
    this.username = this.userTokenService.getStoredUsername();
  }

  onBackBtnClick() {
    this.router.navigate(['/']);
  }
}
