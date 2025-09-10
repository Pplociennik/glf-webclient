import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-component',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.scss'
})
export class NavBarComponent {
  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/']);
  }
}
