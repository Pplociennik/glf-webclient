import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [TranslocoModule],
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
