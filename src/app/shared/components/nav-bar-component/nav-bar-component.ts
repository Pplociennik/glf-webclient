import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageSwitcherComponent } from '../language-switcher-component/language-switcher-component';

@Component({
  selector: 'app-nav-bar-component',
  standalone: true,
  imports: [LanguageSwitcherComponent],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.scss'
})
export class NavBarComponent {
  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/']);
  }
}
