import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIcon } from '@angular/material/icon';
import { UserTokenManagementService } from '../../../services/user-token-management-service';

const MOBILE_QUERY = '(max-width: 1024px), (orientation: landscape) and (max-height: 500px)';

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
export class AccountManagementComponent implements OnInit, OnDestroy {
  username!: string;
  sidenavOpen = true;
  sidenavMode: 'side' | 'over' = 'side';

  private mobileQuery!: MediaQueryList;
  private mobileQueryListener!: (e: MediaQueryListEvent) => void;

  constructor(
    private router: Router,
    private userTokenService: UserTokenManagementService,
  ) {
    this.username = this.userTokenService.getStoredUsername();
  }

  ngOnInit() {
    this.mobileQuery = window.matchMedia(MOBILE_QUERY);
    this.updateSidenavForViewport(this.mobileQuery.matches);

    this.mobileQueryListener = (e: MediaQueryListEvent) => this.updateSidenavForViewport(e.matches);
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  onBackBtnClick() {
    this.router.navigate(['/']);
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  closeSidenavOnMobile() {
    if (this.mobileQuery.matches) {
      this.sidenavOpen = false;
    }
  }

  private updateSidenavForViewport(isMobile: boolean) {
    this.sidenavMode = isMobile ? 'over' : 'side';
    this.sidenavOpen = !isMobile;
  }
}
