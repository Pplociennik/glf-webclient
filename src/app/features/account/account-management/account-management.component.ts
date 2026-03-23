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
  userDataBtnDisable: boolean = true;
  securityBtnDisabled: boolean = false;
  socialBtnDisabled: boolean = false;
  deleteAccountBtnDisabled: boolean = false;
  username!: string;

  constructor(
    private router: Router,
    private userTokenService: UserTokenManagementService,
  ) {
    this.username = this.userTokenService.getStoredUsername();
  }

  onSocialBtnClick() {
    this.socialBtnDisabled = true;
    this.userDataBtnDisable = false;
    this.securityBtnDisabled = false;
    this.deleteAccountBtnDisabled = false;
  }

  onSecurityBtnClick() {
    this.securityBtnDisabled = true;
    this.socialBtnDisabled = false;
    this.userDataBtnDisable = false;
    this.deleteAccountBtnDisabled = false;
  }

  onUserDataBtnClick() {
    this.userDataBtnDisable = true;
    this.securityBtnDisabled = false;
    this.socialBtnDisabled = false;
    this.deleteAccountBtnDisabled = false;
  }

  onDeleteAccountBtnClick() {
    this.deleteAccountBtnDisabled = true;
    this.userDataBtnDisable = false;
    this.securityBtnDisabled = false;
    this.socialBtnDisabled = false;
  }

  onBackBtnClick() {
    this.router.navigate(['/']);
  }
}
