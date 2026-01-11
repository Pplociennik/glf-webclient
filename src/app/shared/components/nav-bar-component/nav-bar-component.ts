import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageSwitcherComponent } from '../language-switcher-component/language-switcher-component';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { UserTokenManagementService } from '../../../services/user-token-management-service.ts.service';

@Component({
  selector: 'app-nav-bar-component',
  standalone: true,
  imports: [LanguageSwitcherComponent, AccountMenuComponent],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.scss',
})
export class NavBarComponent {
  constructor(private router: Router, private userTokenService: UserTokenManagementService) {}

  get userLoggedIn(): boolean {
    return this.userTokenService.isStillValid();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
