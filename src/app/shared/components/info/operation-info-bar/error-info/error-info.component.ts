import { Component, input } from '@angular/core';

/**
 * Displays an error information message to the user.
 */
@Component({
  selector: 'app-error-info',
  standalone: true,
  templateUrl: './error-info.component.html',
  styleUrls: ['./error-info.component.scss'],
})
export class ErrorInfoComponent {
  labelText = input<string>('');
}
