import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar-component/nav-bar-component';

@Component({
  selector: 'app-home-page-component',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.scss'
})
export class HomePageComponent {

}
