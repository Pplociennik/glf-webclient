import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageSwitcherComponent } from '../language-switcher-component/language-switcher.component';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { UserTokenManagementService } from '../../../../services/user-token-management-service';
import { Subscription } from 'rxjs';

/**
 * Navigation bar component displayed at the top of the application.
 * Contains logo, language switcher, and user account menu.
 */
@Component({
  selector: 'app-nav-bar-component',
  standalone: true,
  imports: [LanguageSwitcherComponent, AccountMenuComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit, OnDestroy {
  userLoggedIn = false;
  private authSubscription?: Subscription;

  constructor(private router: Router, private userTokenService: UserTokenManagementService) {}

  /**
   * Initializes the component by subscribing to authentication state changes.
   */
  ngOnInit(): void {
    this.authSubscription = this.userTokenService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.userLoggedIn = isAuthenticated;
    });
  }

  /**
   * Cleans up the authentication subscription to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  /**
   * Navigates to the home page when the logo is clicked.
   */
  goHome() {
    this.router.navigate(['/']);
  }
}
