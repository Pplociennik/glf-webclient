import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.scss'
})
export class HomePageComponent {

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
